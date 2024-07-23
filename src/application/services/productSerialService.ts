import { inject, injectable } from 'inversify';
import { IProductSerialRepository, ProductSerialFilter } from 'src/domain/repositories';
import {
  CreateProductSerialDto,
  IProductSerialService,
  UpdateProductSerialDto,
} from 'src/domain/services/productSerialService';
import { ProductSerial } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class ProductSerialService implements IProductSerialService {
  constructor(
    @inject(INTERFACE_NAME.ProductSerialRepository)
    private productSerialRepository: IProductSerialRepository,
  ) {}

  async getOneProductSerialBySerial(serialNumber: string): Promise<ProductSerial> {
    try {
      const productSerial = await this.productSerialRepository.find({ serialNumber });
      if (!productSerial) {
        throw new NotFoundError('Serial not exist');
      }

      return productSerial[0];
    } catch (error) {
      throw error;
    }
  }

  async getProductSerials(filter: ProductSerialFilter): Promise<ProductSerial[]> {
    try {
      return await this.productSerialRepository.find(filter);
    } catch (error) {
      throw error;
    }
  }

  async getOneProductSerial(id: number): Promise<ProductSerial> {
    try {
      const productSerial = await this.productSerialRepository.findById(id);
      if (!productSerial) {
        throw new NotFoundError(`Product serial with id ${id} not found`);
      }
      return productSerial;
    } catch (error) {
      throw error;
    }
  }

  async createProductSerial(
    createProductSerialDto: CreateProductSerialDto,
    userId: number,
  ): Promise<ProductSerial> {
    try {
      const productSerial = await this.productSerialRepository.add(createProductSerialDto);
      return productSerial;
    } catch (error) {
      throw error;
    }
  }

  async updateProductSerial(
    id: number,
    updateProductSerialDto: UpdateProductSerialDto,
  ): Promise<ProductSerial> {
    try {
      const productSerialExist = await this.getOneProductSerial(id);
      return await this.productSerialRepository.update(id, updateProductSerialDto);
    } catch (error) {
      throw new Error(`Failed to update product serial: ${error}`);
    }
  }

  async deleteProductSerial(id: number): Promise<ProductSerial> {
    try {
      const productSerialExist = await this.getOneProductSerial(id);
      return await this.productSerialRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete product serial: ${error}`);
    }
  }
}
