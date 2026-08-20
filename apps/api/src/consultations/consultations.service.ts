import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async create(clinicId: string, data: any) {
    return this.prisma.consultation.create({
      data: {
        ...data,
        clinicId,
      },
      include: {
        patient: true,
        doctor: true,
        prescription: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async findAll(clinicId: string, query: any) {
    const { page = 1, limit = 10, patientId, doctorId } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where: any = { clinicId };

    if (patientId) {
      where.patientId = patientId;
    }

    if (doctorId) {
      where.doctorId = doctorId;
    }

    const [consultations, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        skip,
        take,
        orderBy: { date: 'desc' },
        include: {
          patient: true,
          doctor: true,
        },
      }),
      this.prisma.consultation.count({ where }),
    ]);

    return {
      data: consultations,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async findOne(clinicId: string, id: string) {
    const consultation = await this.prisma.consultation.findFirst({
      where: { id, clinicId },
      include: {
        patient: true,
        doctor: true,
        prescription: {
          include: {
            items: true,
          },
        },
        followUps: true,
      },
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return consultation;
  }

  async update(clinicId: string, id: string, data: any) {
    const consultation = await this.prisma.consultation.updateMany({
      where: { id, clinicId },
      data,
    });

    if (consultation.count === 0) {
      throw new NotFoundException('Consultation not found');
    }

    return this.prisma.consultation.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  async remove(clinicId: string, id: string) {
    const consultation = await this.prisma.consultation.deleteMany({
      where: { id, clinicId },
    });

    if (consultation.count === 0) {
      throw new NotFoundException('Consultation not found');
    }

    return { id };
  }
}
