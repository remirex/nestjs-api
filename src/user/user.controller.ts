import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { GetCurrentUserId } from 'src/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUserId() userId: number) {
    return this.userService.getMe(userId);
  }

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
