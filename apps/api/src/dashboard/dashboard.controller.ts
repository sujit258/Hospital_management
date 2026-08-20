import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { Tenant } from '../common/decorators/tenant.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get dashboard metrics' })
  async getMetrics(@Tenant() clinicId: string) {
    return this.dashboardService.getMetrics(clinicId);
  }

  @Get('appointments-chart')
  @ApiOperation({ summary: 'Get appointments chart data' })
  async getAppointmentsChart(
    @Tenant() clinicId: string,
    @Query('period') period?: string,
  ) {
    return this.dashboardService.getAppointmentsChart(clinicId, period || '7d');
  }

  @Get('patient-growth')
  @ApiOperation({ summary: 'Get patient growth data' })
  async getPatientGrowth(
    @Tenant() clinicId: string,
    @Query('period') period?: string,
  ) {
    return this.dashboardService.getPatientGrowth(clinicId, period || '30d');
  }
}
