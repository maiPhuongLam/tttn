import { Admin, admins } from '../schemas';
import { injectable } from 'inversify';
import { IAdminRepository } from 'src/domain/repositories';
import { Repository } from './repository';
import { eq } from 'drizzle-orm';

@injectable()
export class AdminRepository extends Repository<Admin> implements IAdminRepository {
  constructor() {
    super(admins);
  }

  async findByUserId(userId: number): Promise<Admin> {
    const [admin] = await this.db.select().from(admins).where(eq(admins.userId, userId)).execute();
    return admin;
  }
}
