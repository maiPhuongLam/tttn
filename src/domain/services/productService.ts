import { Product } from 'src/infrastructure/database/schemas';

type CreateProductDto = {
  name: string;
  brandId: number;
  categoryId: number;
  releaseDate: Date;
  image: string;
  features: {
    screenSize: string;
    battery: string;
    camera: string;
    processor: string;
    ram: string;
    storage: number;
    os: string;
  };
};
type UpdateProductDto = Partial<CreateProductDto>;

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getOneProduct(id: number): Promise<Product>;
  createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product>;
  updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
}
