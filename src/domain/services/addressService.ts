import { CreateAddressDto } from 'src/application/dtos';
import { Address } from 'src/infrastructure/database/schemas';

export interface IAddressService {
  createAddress(createAddressDto: CreateAddressDto): Promise<Address>;
}
