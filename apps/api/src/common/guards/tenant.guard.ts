import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // If no user, deny access
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // Extract clinicId from user (from JWT token)
    const userClinicId = user.clinicId;
    
    // Extract clinicId from request (from route params or headers)
    const requestClinicId = request.params?.clinicId || request.headers['x-clinic-id'];
    
    // If request has a clinicId, it must match the user's clinicId
    if (requestClinicId && requestClinicId !== userClinicId) {
      throw new ForbiddenException('Access denied: Invalid clinic');
    }

    // Add clinicId to request for use in controllers
    request.clinicId = userClinicId;
    
    return true;
  }
}
