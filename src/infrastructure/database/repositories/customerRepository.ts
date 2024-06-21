import { Customer, customers } from '../schemas';
import { injectable } from 'inversify';
import { ICustomerRepository } from 'src/domain/repositories';
import { Repository } from './repository';
import { eq } from 'drizzle-orm';

@injectable()
export class CustomerRepository extends Repository<Customer> implements ICustomerRepository {
  constructor() {
    super(customers);
  }

  async findByUserId(userId: number): Promise<Customer> {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.userId, userId))
      .execute();
    return customer;
  }
}
