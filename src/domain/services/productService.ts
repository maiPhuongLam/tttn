import { Product } from 'src/infrastructure/database/schemas';
import { CreateProductDto, UpdateProductDto } from '../dtos';

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getOneProduct(id: number): Promise<Product>;
  createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product>;
  updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
}
