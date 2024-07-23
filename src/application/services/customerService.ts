import { inject, injectable } from 'inversify';
import { ICustomerRepository } from 'src/domain/repositories';
import { ICustomerService } from 'src/domain/services';
import { Customer } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @inject(INTERFACE_NAME.CustomerRepository) private customerRepository: ICustomerRepository,
  ) {}

  async createCustomer(userId: number): Promise<Customer> {
    try {
      return await this.customerRepository.add({ userId });
    } catch (error) {
      throw error;
    }
  }

  async get(): Promise<Customer[]> {
    try {
      return await this.customerRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findById(id);
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId: number): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findByUserId(userId)!;
      return customer;
    } catch (error) {
      throw error;
    }
  }
}
