import { Admin } from 'src/infrastructure/database/schemas';

export interface IAdminService {
  createAdmin(userId: number): Promise<Admin>;
  get(): Promise<Admin[]>;
  getAdminById(id: number): Promise<Admin>;
  getAdminByUserId(userId: number): Promise<Admin>;
}
