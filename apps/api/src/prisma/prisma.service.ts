import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    // Delete in order to respect foreign key constraints
    await this.notification.deleteMany();
    await this.feedback.deleteMany();
    await this.whatsAppMessage.deleteMany();
    await this.followUp.deleteMany();
    await this.prescriptionItem.deleteMany();
    await this.prescription.deleteMany();
    await this.consultation.deleteMany();
    await this.appointment.deleteMany();
    await this.doctorProfile.deleteMany();
    await this.patient.deleteMany();
    await this.user.deleteMany();
    await this.clinic.deleteMany();
  }
}
