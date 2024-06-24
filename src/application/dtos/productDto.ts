import { z, TypeOf } from 'zod';
import { idParamsSchema } from './userDto';
import { productDetailBody } from './productDetailDto';

export const productBody = {
  name: z.string({ required_error: 'name is required' }),
  brandId: z.number({ required_error: 'brandId is required' }),
  categoryId: z.number({ required_error: 'categoryId is required' }),
  featureId: z.number({ required_error: 'featureId is required' }),
  releaseDate: z.date({ required_error: 'releaseDate is required' }),
  image: z.string(),
  features: z.object(
    { ...productDetailBody },
    {
      required_error: 'features is required',
    },
  ),
};

export const createProductSchema = z.object({
  body: z.object(productBody),
});

export type CreateProductDto = TypeOf<typeof createProductSchema>['body'];

export const updateProductSchema = z.object({
  params: idParamsSchema,
  body: z.object(productBody).partial(),
});

export type UpdateProductDto = TypeOf<typeof updateProductSchema>['body'];
