import { Product } from 'src/infrastructure/database/schemas';
import { RepoResponseGetProducts } from '../repositories';

export type CreateProductDto = {
  name: string;
  brandId: number;
  categoryId: number;
  releaseDate: Date;
  image: string;
  originalPrice: number;
  features: {
    screenSize: string;
    battery: string;
    camera: string;
    processor: string;
    os: string;
  };
};
export type UpdateProductDto = Partial<CreateProductDto>;

export interface IProductService {
  getProducts(filter: any): Promise<Product[] | RepoResponseGetProducts>;
  getOneProduct(id: number): Promise<Product>;
  createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product>;
  updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  softDeleteProduct(id: number): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
  // getProductByName(name: string): Promise<any>
}
