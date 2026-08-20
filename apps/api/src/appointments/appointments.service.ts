import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(clinicId: string, data: any) {
    const { doctorId, patientId, startTime, endTime } = data;

    // Check for scheduling conflicts
    const hasConflict = await this.checkConflict(clinicId, doctorId, new Date(startTime), new Date(endTime));
    if (hasConflict) {
      throw new ConflictException('Scheduling conflict: Doctor already has an appointment at this time');
    }

    return this.prisma.appointment.create({
      data: {
        ...data,
        clinicId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  async findAll(clinicId: string, query: any) {
    const { page = 1, limit = 10, date, doctorId, patientId, status } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where: any = { clinicId };

    if (date) {
      const targetDate = new Date(date);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      where.startTime = {
        gte: targetDate,
        lt: nextDay,
      };
    }

    if (doctorId) {
      where.doctorId = doctorId;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    if (status) {
      where.status = status;
    }

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        skip,
        take,
        orderBy: { startTime: 'asc' },
        include: {
          patient: true,
          doctor: true,
        },
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return {
      data: appointments,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async findOne(clinicId: string, id: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, clinicId },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async update(clinicId: string, id: string, data: any) {
    const existing = await this.prisma.appointment.findFirst({
      where: { id, clinicId },
    });

    if (!existing) {
      throw new NotFoundException('Appointment not found');
    }

    // If changing time, check for conflicts
    if (data.startTime || data.endTime) {
      const startTime = data.startTime ? new Date(data.startTime) : existing.startTime;
      const endTime = data.endTime ? new Date(data.endTime) : existing.endTime;
      const doctorId = data.doctorId || existing.doctorId;

      const hasConflict = await this.checkConflict(clinicId, doctorId, startTime, endTime, id);
      if (hasConflict) {
        throw new ConflictException('Scheduling conflict: Doctor already has an appointment at this time');
      }
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...data,
        ...(data.startTime && { startTime: new Date(data.startTime) }),
        ...(data.endTime && { endTime: new Date(data.endTime) }),
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  async remove(clinicId: string, id: string) {
    const appointment = await this.prisma.appointment.deleteMany({
      where: { id, clinicId },
    });

    if (appointment.count === 0) {
      throw new NotFoundException('Appointment not found');
    }

    return { id };
  }

  async checkConflict(clinicId: string, doctorId: string, startTime: Date, endTime: Date, excludeId?: string): Promise<boolean> {
    const conflicting = await this.prisma.appointment.findFirst({
      where: {
        clinicId,
        doctorId,
        status: { not: 'CANCELLED' },
        id: excludeId ? { not: excludeId } : undefined,
        OR: [
          {
            startTime: { lte: startTime },
            endTime: { gt: startTime },
          },
          {
            startTime: { lt: endTime },
            endTime: { gte: endTime },
          },
          {
            startTime: { gte: startTime },
            endTime: { lte: endTime },
          },
        ],
      },
    });

    return !!conflicting;
  }
}
