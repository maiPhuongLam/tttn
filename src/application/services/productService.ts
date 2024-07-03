import { inject, injectable } from 'inversify';
import { IProductRepository } from 'src/domain/repositories';
import { Product } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { IAdminService, IProductDetailService, IProductService } from 'src/domain/services';
import {
  deleteProductIndex,
  indexProduct,
  searchProductsByName,
  updateProductIndex,
} from 'src/shared/utils';
import myQueue from 'src/infrastructure/workers';
import logger from 'src/infrastructure/logger';

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
      logger.error('Error in getProducts:', error);
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
      logger.error('Error in getOneProduct:', error);
      throw error;
    }
  }

  async createProduct(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    try {
      const { features, ...productData } = createProductDto;
      const admin = await this.adminService.getAdminByUserId(userId);
      const feature = await this.productDetailService.createProductDetail(features);
      const product = await this.productRepository.add({
        ...productData,
        releaseDate: new Date(productData.releaseDate),
        featureId: feature.id,
        adminId: admin.id,
        // image: {
        //   public_id: "",
        //   url: ""
        // }
      });
      await indexProduct(product);
      // if (createProductDto.image) {
      //   const imagePath = createProductDto.image;
      //   await myQueue.add('image-upload', { imagePath, product });
      // }
      return product;
    } catch (error) {
      logger.error('Error in createProduct:', error); // Log lỗi tại đây
      throw error;
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      await this.getOneProduct(id);
      const updatedProduct = await this.productRepository.update(id, {
        ...updateProductDto,
        releaseDate: new Date(updateProductDto.releaseDate!),
      });
      await updateProductIndex(updatedProduct);
      return updatedProduct;
    } catch (error) {
      logger.error('Error in updateProduct:', error);
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
      logger.error('Error in deleteProduct:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const products = (await searchProductsByName(query)) as Product[];
      return products;
    } catch (error) {
      logger.error('Error in searchProducts:', error);
      throw error;
    }
  }
}
