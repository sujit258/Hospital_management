import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { Tenant } from '../common/decorators/tenant.decorator';
import { ConsultationsService } from './consultations.service';

@ApiTags('consultations')
@Controller('consultations')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class ConsultationsController {
  constructor(private consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  async create(@Tenant() clinicId: string, @Body() data: any) {
    return this.consultationsService.create(clinicId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  async findAll(
    @Tenant() clinicId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('patientId') patientId?: string,
    @Query('doctorId') doctorId?: string,
  ) {
    return this.consultationsService.findAll(clinicId, { page, limit, patientId, doctorId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by ID' })
  async findOne(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.consultationsService.findOne(clinicId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consultation' })
  async update(@Tenant() clinicId: string, @Param('id') id: string, @Body() data: any) {
    return this.consultationsService.update(clinicId, id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete consultation' })
  async remove(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.consultationsService.remove(clinicId, id);
  }
}
