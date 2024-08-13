import { inject, injectable } from 'inversify';
import {
  IProductRepository,
  ProductFilters,
  RepoResponseGetProducts,
} from 'src/domain/repositories';
import { Product, productDetails, products } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import {
  IAdminService,
  IProductDetailService,
  IProductService,
  CreateProductDto,
  UpdateProductDto,
} from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import cache from 'src/infrastructure/cache';
import { DB } from 'src/infrastructure/database/connect';
import { eq } from 'drizzle-orm';
@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(INTERFACE_NAME.ProductRepository) private productRepository: IProductRepository,
    @inject(INTERFACE_NAME.ProductDetailService)
    private productDetailService: IProductDetailService,
    @inject(INTERFACE_NAME.AdminService) private adminService: IAdminService,
  ) {}

  async getProducts(filter: ProductFilters): Promise<Product[] | RepoResponseGetProducts> {
    try {
      const data = await this.productRepository.filter(filter);
      data.products = data.products.map((product) => ({
        ...product,
        name: `${product.name + ' ' + (product.storage || '') + ' ' + (product.color || '')}`.trim(),
      }));
      return data;
    } catch (error) {
      logger.error('Error in Get Products:', error);
      throw error;
    }
  }

  async getOneProduct(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new NotFoundError(`Product with id = ${id} is not found`);
      }

      return { ...product };
    } catch (error) {
      logger.error('Error in Get One Product:', error);
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
        isDelete: false,
      });
      return product;
    } catch (error) {
      logger.error('Error in Create Product:', error); // Log lỗi tại đây
      throw error;
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    try {
      await this.getOneProduct(id);
      const updatedProduct = await this.productRepository.update(id, {
        ...updateProductDto,
        releaseDate: new Date(updateProductDto.releaseDate!),
      });
      if (updateProductDto.features) {
        await this.productDetailService.updateProductDetail(updatedProduct.featureId!, {
          battery: updateProductDto.features.battery,
          screenSize: updateProductDto.features.screenSize,
          camera: updateProductDto.features.camera,
          processor: updateProductDto.features.processor,
          os: updateProductDto.features.os,
        });
      }
      return await DB.select()
        .from(products)
        .where(eq(products.id, id))
        .innerJoin(productDetails, eq(productDetails.id, products.id));
    } catch (error) {
      logger.error('Error in Update Product:', error);
      throw error;
    }
  }

  async softDeleteProduct(id: number): Promise<Product> {
    try {
      await this.getOneProduct(id);
      const updatedProduct = await this.productRepository.update(id, {
        isDelete: true,
      });
      return updatedProduct;
    } catch (error) {
      logger.error('Error in Soft Delete Product:', error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      await this.getOneProduct(id);
      const deletedProduct = await this.productRepository.delete(id);
      return deletedProduct;
    } catch (error) {
      logger.error('Error in Delete Product:', error);
      throw error;
    }
  }
}
