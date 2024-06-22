import { inject, injectable } from 'inversify';
import { IProductRepository } from 'src/domain/repositories';
import { Product } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { IAdminService, IProductDetailService, IProductService } from 'src/domain/services';
import { deleteProductIndex, indexProduct, updateProductIndex } from 'src/shared/utils';

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(INTERFACE_NAME.ProductRepository) private productRepository: IProductRepository,
    @inject(INTERFACE_NAME.ProductDetailService)
    private productDetailService: IProductDetailService,
    @inject(INTERFACE_NAME.AdminService) private adminService: IAdminService,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOneProduct(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new NotFoundError(`Product with id = ${id} is not found`);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    try {
      const admin = await this.adminService.getAdminByUserId(userId);
      const { features } = createProductDto;
      const feature = await this.productDetailService.createProductDetail(features);
      const product = await this.productRepository.add({
        ...createProductDto,
        featureId: feature.id,
        adminId: admin.id,
      });
      await indexProduct(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      await this.getOneProduct(id);
      const updatedProduct = await this.productRepository.update(id, updateProductDto);
      await updateProductIndex(updatedProduct);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      await this.getOneProduct(id);
      const deletedProduct = await this.productRepository.delete(id);
      await deleteProductIndex(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}
