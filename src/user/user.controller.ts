import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
  })
  @Get('all')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }
}
