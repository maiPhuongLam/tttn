import { injectable } from 'inversify';
import { Repository } from './repository';
import { productItems, ProductSerial, productSerials } from '../schemas';
import { IProductSerialRepository, ProductSerialFilter } from 'src/domain/repositories';
import { and, eq, SQL } from 'drizzle-orm';

@injectable()
export class ProductSerialRepository
  extends Repository<ProductSerial>
  implements IProductSerialRepository
{
  constructor() {
    super(productSerials);
  }

  async find(filters: ProductSerialFilter): Promise<ProductSerial[]> {
    const filtersArray: SQL[] = [];

    if (filters.productItemId) {
      filtersArray.push(eq(productSerials.productItemId, filters.productItemId));
    }

    if (filters.serialNumber) {
      filtersArray.push(eq(productSerials.serialNumber, filters.serialNumber));
    }

    if (filters.status) {
      filtersArray.push(eq(productSerials.status, filters.status));
    }

    const query = this.db.select().from(productSerials);

    if (filtersArray.length === 1) {
      return await query.where(filtersArray[0]);
    } else if (filtersArray.length > 1) {
      return await query.where(and(...filtersArray));
    }

    return await query;
  }
}
