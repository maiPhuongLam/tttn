import { CreateUserDto, UpdateUserDto } from 'src/application/dtos';
import { User } from 'src/infrastructure/database/schemas';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  updateUser(updateUserDto: UpdateUserDto): Promise<User>;
}
