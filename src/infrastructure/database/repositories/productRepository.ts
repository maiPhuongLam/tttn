import { injectable } from 'inversify';
import { Repository } from './repository';
import { Product, productDetails, productItems, products } from '../schemas';
import {
  IProductRepository,
  ProductFilters,
  RepoResponseGetProducts,
} from 'src/domain/repositories';
import { eq, sql, and, count, gte, lte } from 'drizzle-orm';

@injectable()
export class ProductRepository extends Repository<Product> implements IProductRepository {
  constructor() {
    super(products);
  }

  async filter(filters: ProductFilters): Promise<RepoResponseGetProducts> {
    const { name, brandId, page = 1, pageSize = 12, minPrice = 0, maxPrice = 200000000 } = filters;
    let baseQuery = this.db
      .select({
        productId: products.id,
        name: products.name,
        image: products.image,
        releaseDate: products.releaseDate,
        storage: productItems.storage,
        color: productItems.color,
        price: productItems.price,
        itemId: productItems.id,
      })
      .from(products)
      .orderBy(products.name)
      .innerJoin(productItems, eq(productItems.productId, products.id));
    const conditions = [
      gte(products.originalPrice, minPrice),
      lte(products.originalPrice, maxPrice),
    ];
    
    if (name) {
      conditions.push(
        sql`to_tsvector('english', ${products.name}) @@ phraseto_tsquery('english', ${name})`,
      );
      conditions.push(
        sql`to_tsvector('english', ${products.name}) @@ websearch_to_tsquery('english', ${name})`,
      );
    }

    if (brandId) {
      conditions.push(eq(products.brandId, brandId));
    }

    const offset = (page - 1) * pageSize;

    const query =
      conditions.length > 0
        ? baseQuery
            .where(and(...conditions))
            .limit(pageSize)
            .offset(offset)
        : baseQuery.limit(pageSize).offset(offset);

    const [productsResult, countResult] = await Promise.all([
      query,
      this.db
        .select({ 
          count: sql<number>`cast(count(${products.id}) as integer)` 
        })
        .from(products)
        .innerJoin(productItems, eq(productItems.productId, products.id))
        .where(and(...conditions))
    ]);
  
    const totalCount = countResult[0].count;
    const totalPages = Math.ceil(totalCount / pageSize);
      
    return {
      products: productsResult,
      count: totalCount,
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
    };
  }
}
