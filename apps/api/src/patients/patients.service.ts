import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(clinicId: string, data: any) {
    const patientCode = await this.generatePatientCode(clinicId);
    
    return this.prisma.patient.create({
      data: {
        ...data,
        clinicId,
        patientCode,
      },
    });
  }

  async findAll(clinicId: string, query: any) {
    const { page = 1, limit = 10, search } = query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where: any = { clinicId };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { patientCode: { contains: search } },
      ];
    }

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      data: patients,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async findOne(clinicId: string, id: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, clinicId },
      include: {
        appointments: true,
        consultations: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(clinicId: string, id: string, data: any) {
    const patient = await this.prisma.patient.updateMany({
      where: { id, clinicId },
      data,
    });

    if (patient.count === 0) {
      throw new NotFoundException('Patient not found');
    }

    return this.prisma.patient.findUnique({ where: { id } });
  }

  async remove(clinicId: string, id: string) {
    const patient = await this.prisma.patient.deleteMany({
      where: { id, clinicId },
    });

    if (patient.count === 0) {
      throw new NotFoundException('Patient not found');
    }

    return { id };
  }

  async search(clinicId: string, query: string) {
    return this.prisma.patient.findMany({
      where: {
        clinicId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query } },
          { patientCode: { contains: query } },
        ],
      },
      take: 20,
    });
  }

  async generatePatientCode(clinicId: string): Promise<string> {
    const count = await this.prisma.patient.count({
      where: { clinicId },
    });
    
    const nextNumber = count + 1;
    return `HC-${String(nextNumber).padStart(6, '0')}`;
  }
}
