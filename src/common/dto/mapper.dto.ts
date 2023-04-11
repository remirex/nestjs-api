import { User } from '@prisma/client';
import { UserDto } from 'src/user/dto';
import { exclude } from '../helper';

export const toUserDto = (data: User): UserDto => {
  const userDto: UserDto = exclude(data, ['hash', 'hashedRt']);

  return userDto;
};

export const toUsersDto = (data: User[]): UserDto[] => {
  return data.map((user: User) => toUserDto(user));
};
