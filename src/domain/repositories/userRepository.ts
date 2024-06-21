import { User } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByPhoneNumber(phoneNumber: string): Promise<User | null>;
}
