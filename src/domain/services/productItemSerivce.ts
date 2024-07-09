import { ProductItem } from 'src/infrastructure/database/schemas';
type CreateProductItemDto = {
  createdAt: Date;
  updatedAt: Date;
  SKU: string;
  quantityInStock: number;
  status: 'locked' | 'unlock' | 'sold';
  ram: string;
  storage: number;
  price: number;
  color: string;
  image: string;
  productId: number | null;
};

type UpdateProductItemDto = Partial<CreateProductItemDto>;

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
