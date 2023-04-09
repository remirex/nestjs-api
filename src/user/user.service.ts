import { Injectable } from '@nestjs/common';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
  toUserDto,
  toUsersDto,
} from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return toUserDto(user);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    return toUsersDto(users);
  }

  async getUsersWithPagination(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const results = await this.prisma.user.findMany({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        id: pageOptionsDto.order,
      },
    });
    const transforedUsers = toUsersDto(results);
    const itemCount = await this.prisma.user.count();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(transforedUsers, pageMetaDto);
  }
}
