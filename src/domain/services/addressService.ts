import { Address } from 'src/infrastructure/database/schemas';
import { CreateAddressDto } from '../dtos';

export interface IAddressService {
  createAddress(createAddressDto: CreateAddressDto): Promise<Address>;
}
