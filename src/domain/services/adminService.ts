import { Admin } from 'src/infrastructure/database/schemas';

export interface IAdminService {
  createAdmin(userId: number): Promise<Admin>;
  find(): Promise<Admin[]>;
  findById(id: number): Promise<Admin | null>;
  findByUserId(userId: number): Promise<Admin | null>;
}
