import { Injectable } from '@nestjs/common';
import { toUserDto, toUsersDto } from 'src/common/dto';
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
}
