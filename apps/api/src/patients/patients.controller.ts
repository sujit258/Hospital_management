import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { Tenant } from '../common/decorators/tenant.decorator';
import { PatientsService } from './patients.service';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  async create(@Tenant() clinicId: string, @Body() data: any) {
    return this.patientsService.create(clinicId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  async findAll(
    @Tenant() clinicId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.patientsService.findAll(clinicId, { page, limit, search });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search patients' })
  async search(@Tenant() clinicId: string, @Query('q') query: string) {
    return this.patientsService.search(clinicId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  async findOne(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.patientsService.findOne(clinicId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient' })
  async update(@Tenant() clinicId: string, @Param('id') id: string, @Body() data: any) {
    return this.patientsService.update(clinicId, id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  async remove(@Tenant() clinicId: string, @Param('id') id: string) {
    return this.patientsService.remove(clinicId, id);
  }
}
