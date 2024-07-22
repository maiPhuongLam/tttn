import { Customer } from 'src/infrastructure/database/schemas';

export interface ICustomerService {
  createCustomer(userId: number): Promise<Customer>;
  get(): Promise<Customer[]>;
  getById(id: number): Promise<Customer | null>;
  getByUserId(userId: number): Promise<Customer>;
}
