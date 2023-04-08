import { Injectable } from '@nestjs/common';
import { toUserDto, toUsersDto } from 'src/common/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return toUserDto(user);
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();

    return toUsersDto(users);
  }
}
