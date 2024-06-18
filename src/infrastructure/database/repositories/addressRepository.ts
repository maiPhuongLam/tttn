import { injectable } from 'inversify';
import { IAddressRepository } from 'src/domain/repositories';
import { BaseCreateEntityType } from 'src/shared/types';
import { DB } from '../connect';
import { Address, addresses } from '../schemas';
import { Repository } from './repository';

@injectable()
export class AddressRepository extends Repository<Address> implements IAddressRepository {
  constructor() {
    super(addresses);
  }
}
