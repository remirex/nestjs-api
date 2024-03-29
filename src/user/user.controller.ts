import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { GetCurrentUserId } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/dto';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUserId() userId: number): Promise<UserDto> {
    return this.userService.getMe(userId);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
  })
  @Get('all')
  @HttpCode(HttpStatus.OK)
  getUsers(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.userService.getUsersWithPagination(pageOptionsDto);
  }
}
