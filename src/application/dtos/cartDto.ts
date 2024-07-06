import { z, TypeOf } from 'zod';
import { idParamsSchema } from './userDto';

export const createCartSchema = z.object({
  body: z.object({
    customerId: z.number({ required_error: 'customerId cart is required' }),
  }),
});

export type CreateCartDto = TypeOf<typeof createCartSchema>['body'];

export const updateCartSchema = z.object({
  params: idParamsSchema,
  body: createCartSchema.optional(),
});

export type UpdateCartDto = TypeOf<typeof updateCartSchema>['body'];
