import { ProductItem } from 'src/infrastructure/database/schemas';
import { BasePropsType } from 'src/shared/types';

export interface IProductItemService {
  getProductItems(): Promise<ProductItem[]>;
  getOneProductItem(id: number): Promise<ProductItem>;
  createProductItem(
    createProductItemDto: CreateProductItemDto,
    userId: number,
  ): Promise<ProductItem>;
  updateProductItem(id: number, updateProductItemDto: UpdateProductItemDto): Promise<ProductItem>;
  deleteProductItem(id: number): Promise<ProductItem>;
}
