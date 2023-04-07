import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/enums';
import { JwtPayload } from 'src/auth/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    console.log(
      '🚀 ~ file: roles.guard.ts:18 ~ RolesGuard ~ canActivate ~ requiredRoles:',
      requiredRoles,
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = ctx.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: roles.guard.ts:26 ~ RolesGuard ~ canActivate ~ request:',
      request.user,
    );
    const user = request.user as JwtPayload;
    console.log(
      '🚀 ~ file: roles.guard.ts:19 ~ RolesGuard ~ canActivate ~ user:',
      user,
    );

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
