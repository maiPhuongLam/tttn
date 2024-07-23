import { Address } from 'src/infrastructure/database/schemas';
import { BasePropsType } from 'src/shared/types';

export type CreateAddressDto = {
  streetAddress: string;
  wardOrCommune: string;
  district: string;
  cityOrProvince: string;
};

export interface IAddressService {
  createAddress(createAddressDto: CreateAddressDto): Promise<Address>;
}
