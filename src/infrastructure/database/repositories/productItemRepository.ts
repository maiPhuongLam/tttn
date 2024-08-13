import { injectable } from 'inversify';
import { Repository } from './repository';
import { productDetails, ProductItem, productItems, products } from '../schemas';
import {
  IProductItemRepository,
  IProductRepository,
  ProductDetailResponse,
  SKUResponse,
  SortBy,
} from 'src/domain/repositories';
import { desc, eq, asc } from 'drizzle-orm';
import { query } from 'express';

@injectable()
export class ProductItemRepository
  extends Repository<ProductItem>
  implements IProductItemRepository
{
  constructor() {
    super(productItems);
  }

  async findBySKU(SKU: string): Promise<SKUResponse | null> {
    try {
      const [item] = await this.db
        .select({
          id: productItems.id,
          SKU: productItems.SKU,
          price: productItems.price,
          name: products.name,
          color: productItems.color,
          ram: productItems.ram,
          storage: productItems.storage,
        })
        .from(productItems)
        .innerJoin(products, eq(products.id, productItems.productId))
        .where(eq(productItems.SKU, SKU));

      if (
        item &&
        item.id &&
        item.SKU &&
        item.price &&
        item.name &&
        item.color &&
        item.ram &&
        item.storage
      ) {
        return {
          id: item.id,
          SKU: item.SKU,
          price: item.price,
          name: `${item.name} ${item.storage} ${item.color}`,
          color: item.color,
          ram: item.ram,
          storage: item.storage,
        };
      }

      return null;
    } catch (error) {
      throw error;
    }
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
      .innerJoin(products, eq(productItems.productId, products.id))
      .innerJoin(productDetails, eq(products.featureId, productDetails.id))
      .where(eq(productItems.id, id))
      .execute();

    const [data] = await query;
    return data;
  }

  async detailForProductId(productId: number, sort: SortBy): Promise<ProductDetailResponse[]> {
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
      .innerJoin(products, eq(productItems.productId, products.id))
      .innerJoin(productDetails, eq(products.featureId, productDetails.id))
      .where(eq(productItems.productId, productId))
    
    if (sort === SortBy.LOW_TO_HIGH) {
      query.orderBy(asc(productItems.price));
    } else if (sort === SortBy.HIGH_TO_LOW) {
      query.orderBy(desc(productItems.price))
    } else {
      query.orderBy(desc(products.releaseDate))
    }

    
    return await query;
  }
}
