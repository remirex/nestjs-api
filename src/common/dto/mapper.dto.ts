import { User } from '@prisma/client';
import { UserDto } from 'src/user/dto';

export const toUserDto = (data: User): UserDto => {
  const { id, email, role, firstName, lastName, createdAt, updatedAt } = data;

  const userDto: UserDto = {
    id,
    email,
    role,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  };

  return userDto;
};

export const toUsersDto = (data: User[]): UserDto[] => {
  return data.map((user: User) => toUserDto(user));
};
