import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { Tenant } from '../common/decorators/tenant.decorator';
import { AppointmentsService } from './appointments.service';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  async create(@Tenant() clinicId: string, @Body() data: any) {
    return this.appointmentsService.create(clinicId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  async findAll(
    @Tenant() clinicId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('date') date?: string,
    @Query('doctorId') doctorId?: string,
    @Query('patientId') patientId?: string,
    @Query('status') status?: string,
  ) {
    return this.appointmentsService.findAll(clinicId, { page, limit, date, doctorId, patientId, status });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  async findOne(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.appointmentsService.findOne(clinicId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update appointment' })
  async update(@Tenant() clinicId: string, @Param('id') id: string, @Body() data: any) {
    return this.appointmentsService.update(clinicId, id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment' })
  async remove(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.appointmentsService.remove(clinicId, id);
  }
}
