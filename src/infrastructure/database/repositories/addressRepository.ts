import { injectable } from 'inversify';
import { IAddressRepository } from 'src/domain/repositories';
import { Address, addresses } from '../schemas';
import { Repository } from './repository';

@injectable()
export class AddressRepository extends Repository<Address> implements IAddressRepository {
  constructor() {
    super(addresses);
  }
}
