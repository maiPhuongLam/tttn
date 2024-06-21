import { Customer } from 'src/infrastructure/database/schemas';

export interface ICustomerService {
  createCustomer(userId: number): Promise<Customer>;
  find(): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  findByUserId(userId: number): Promise<Customer | null>;
}
