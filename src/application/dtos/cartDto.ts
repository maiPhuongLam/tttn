import { z, TypeOf } from 'zod';
import { idParamsSchema } from './userDto';

const cartBody = z.object({
  customerId: z.number({ required_error: 'customerId cart is required' }),
  status: z.enum(['active', 'inactive', 'expired', 'saved']),
});

export const createCartSchema = z.object({
  body: cartBody,
});

export type CreateCartDto = TypeOf<typeof createCartSchema>['body'];

export const updateCartSchema = z.object({
  params: idParamsSchema,
  body: cartBody.partial(),
});

export type UpdateCartDto = TypeOf<typeof updateCartSchema>['body'];
