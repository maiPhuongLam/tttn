import { inject, injectable } from 'inversify';
import { ICustomerRepository } from 'src/domain/repositories';
import { ICustomerService } from 'src/domain/services';
import { Customer } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';

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

  async find(): Promise<Customer[]> {
    try {
      return await this.customerRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Customer | null> {
    try {
      return await this.customerRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<Customer | null> {
    try {
      return await this.customerRepository.findByUserId(userId);
    } catch (error) {
      throw error;
    }
  }
}
