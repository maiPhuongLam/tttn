import { ProductSerial } from 'src/infrastructure/database/schemas/productSerial';
import { IRepository } from './repository';
import { ProductSerialEnum } from 'src/shared/enums';

export interface ProductSerialFilter {
  productItemId?: number;
  status?: ProductSerialEnum;
  serialNumber?: string;
}

export interface IProductSerialRepository extends IRepository<ProductSerial> {
  find(filters: ProductSerialFilter): Promise<ProductSerial[]>;
}
