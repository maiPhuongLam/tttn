import { User } from 'src/infrastructure/database/schemas';
import { CreateUserDto, UpdateUserDto } from '../dtos';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  updateUser(updateUserDto: UpdateUserDto): Promise<User>;
}
