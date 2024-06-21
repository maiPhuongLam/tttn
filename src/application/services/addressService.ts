import { inject, injectable } from 'inversify';
import { IAddressRepository } from 'src/domain/repositories';
import { Address } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { CreateAddressDto } from '../dtos';
import { IAddressService } from 'src/domain/services/addressService';
import logger from 'src/infrastructure/logger';

@injectable()
export class AddressService implements IAddressService {
  constructor(
    @inject(INTERFACE_NAME.AddressRepository) private addressRepository: IAddressRepository,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      return await this.addressRepository.add(createAddressDto);
    } catch (error) {
      throw error;
    }
  }
}