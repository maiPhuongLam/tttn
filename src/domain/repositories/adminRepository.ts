import { Admin } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IAdminRepository extends IRepository<Admin> {
  findByUserId(userId: number): Promise<Admin>;
}
