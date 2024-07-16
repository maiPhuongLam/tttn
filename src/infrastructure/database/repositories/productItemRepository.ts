import { injectable } from 'inversify';
import { Repository } from './repository';
import { productDetails, ProductItem, productItems, products } from '../schemas';
import {
  IProductItemRepository,
  IProductRepository,
  ProductDetailResponse,
} from 'src/domain/repositories';
import { eq } from 'drizzle-orm';
import { query } from 'express';

@injectable()
export class ProductItemRepository
  extends Repository<ProductItem>
  implements IProductItemRepository
{
  constructor() {
    super(productItems);
  }

  async detail(id: number): Promise<ProductDetailResponse> {
    const query = this.db
      .select({
        itemId: productItems.id,
        productId: productItems.productId,
        sku: productItems.SKU,
        quantityInStock: productItems.quantityInStock,
        status: productItems.status,
        price: productItems.price,
        color: productItems.color,
        storage: productItems.storage,
        ram: productItems.ram,
        image: productItems.image,
        name: products.name,
        releaseDate: products.releaseDate,
        screenSize: productDetails.screenSize,
        camera: productDetails.screenSize,
        processor: productDetails.processor,
        os: productDetails.os,
        isDelete: productItems.isDelete,
      })
      .from(productItems)
      .leftJoin(products, eq(productItems.productId, products.id))
      .innerJoin(productDetails, eq(products.featureId, productDetails.id))
      .where(eq(productItems.id, id))
      .execute();

    const [data] = await query;
    return data;
  }

  async detailForProductId(productId: number): Promise<ProductDetailResponse[]> {
    const query = this.db
      .select({
        itemId: productItems.id,
        productId: productItems.productId,
        sku: productItems.SKU,
        quantityInStock: productItems.quantityInStock,
        status: productItems.status,
        price: productItems.price,
        color: productItems.color,
        storage: productItems.storage,
        ram: productItems.ram,
        image: productItems.image,
        name: products.name,
        releaseDate: products.releaseDate,
        screenSize: productDetails.screenSize,
        camera: productDetails.screenSize,
        processor: productDetails.processor,
        os: productDetails.os,
        isDelete: productItems.isDelete,
      })
      .from(productItems)
      .leftJoin(products, eq(productItems.productId, products.id))
      .innerJoin(productDetails, eq(products.featureId, productDetails.id))
      .where(eq(productItems.productId, productId))
      .execute();

    const data = await query;
    return data;
  }
}
