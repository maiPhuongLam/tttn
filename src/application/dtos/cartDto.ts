import { z, TypeOf } from 'zod';
import { idParamsSchema } from './userDto';

export const createCartSchema = z.object({
  body: z.object({
    customerId: z.number({ required_error: 'customerId cart is required' }),
  }),
});

export type CreateCartDto = TypeOf<typeof createCartSchema>['body'];

export const updateBrandSchema = z.object({
  params: idParamsSchema,
  body: z
    .object({ 
      name: z.string({ required_error: 'name brand is required' }),
    })
    .partial(),
});

export type UpdateBrandDto = TypeOf<typeof updateBrandSchema>['body'];
