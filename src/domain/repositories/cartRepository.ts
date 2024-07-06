import { Cart } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface ICartRepository extends IRepository<Cart> {
  findByCustomerId(customerId: number): Promise<Cart>;
}
