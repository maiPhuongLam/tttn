import { Customer } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface ICustomerRepository extends IRepository<Customer> {
  findByUserId(userId: number): Promise<Customer>;
}
