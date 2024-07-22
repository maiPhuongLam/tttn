import { ProductSerial } from 'src/infrastructure/database/schemas';
import { ProductSerialEnum } from 'src/shared/enums';

export type CreateProductSerialDto = {
  serialNumber: string;
  productItemId: number;
  status: ProductSerialEnum;
};

export type UpdateProductSerialDto = Partial<CreateProductSerialDto>;

export interface IProductSerialService {
  getProductSerials(filter: any): Promise<ProductSerial[]>;
  getOneProductSerial(id: number): Promise<ProductSerial>;
  getOneProductSerialBySerial(serial: string): Promise<ProductSerial>;
  createProductSerial(
    createProductSerialDto: CreateProductSerialDto,
    userId: number,
  ): Promise<ProductSerial>;
  updateProductSerial(
    id: number,
    updateProductSerialDto: UpdateProductSerialDto,
  ): Promise<ProductSerial>;
  deleteProductSerial(id: number): Promise<ProductSerial>;
}
