import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics(clinicId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalPatients,
      appointmentsToday,
      upcomingAppointments,
      recentConsultations,
      followUpsDue,
    ] = await Promise.all([
      this.prisma.patient.count({ where: { clinicId } }),
      this.prisma.appointment.count({
        where: {
          clinicId,
          startTime: { gte: today, lt: tomorrow },
          status: { not: 'CANCELLED' },
        },
      }),
      this.prisma.appointment.count({
        where: {
          clinicId,
          startTime: { gte: today },
          status: { not: 'CANCELLED' },
        },
      }),
      this.prisma.consultation.count({
        where: {
          clinicId,
          date: { gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      this.prisma.followUp.count({
        where: {
          clinicId,
          dueDate: { lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) },
          status: 'PENDING',
        },
      }),
    ]);

    return {
      totalPatients,
      appointmentsToday,
      upcomingAppointments,
      recentConsultations,
      followUpsDue,
    };
  }

  async getAppointmentsChart(clinicId: string, period: string) {
    const days = period === '30d' ? 30 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        clinicId,
        startTime: { gte: startDate },
      },
      select: {
        startTime: true,
        status: true,
      },
    });

    const chartData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayAppointments = appointments.filter(
        (a) => a.startTime >= date && a.startTime < nextDate,
      );

      chartData.push({
        date: date.toISOString().split('T')[0],
        total: dayAppointments.length,
        completed: dayAppointments.filter((a) => a.status === 'COMPLETED').length,
        cancelled: dayAppointments.filter((a) => a.status === 'CANCELLED').length,
      });
    }

    return chartData;
  }

  async getPatientGrowth(clinicId: string, period: string) {
    const days = period === '30d' ? 30 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const patients = await this.prisma.patient.findMany({
      where: {
        clinicId,
        createdAt: { gte: startDate },
      },
      select: {
        createdAt: true,
      },
    });

    const chartData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayPatients = patients.filter(
        (p) => p.createdAt >= date && p.createdAt < nextDate,
      );

      chartData.push({
        date: date.toISOString().split('T')[0],
        count: dayPatients.length,
      });
    }

    return chartData;
  }
}
