import { Product } from 'src/infrastructure/database/schemas';
import client from 'src/infrastructure/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';

export function createCondition<T>(name: string, value: T) {
  return { name, value };
}

export const indexProduct = async (product: Product) => {
  await client.index({
    index: 'products',
    id: product.id.toString(),
    body: product,
  });
};

export const updateProductIndex = async (product: Product) => {
  await client.update({
    index: 'products',
    id: product.id.toString(),
    body: {
      doc: product,
    },
  });
};

export const deleteProductIndex = async (productId: number) => {
  await client.delete({
    index: 'products',
    id: productId.toString(),
  });
};

export const searchProductsByName = async (query: string) => {
  const result: SearchResponse<unknown, Product> = await client.search({
    index: 'products',
    body: {
      query: {
        match: { name: query },
      },
    },
  });

  return result.hits.hits.map((hit) => hit._source);
};
