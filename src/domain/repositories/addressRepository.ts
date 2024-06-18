import { Address } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';

export interface IAddressRepository extends IRepository<Address> {}
