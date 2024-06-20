import { TypeOf, z } from 'zod';
import { UserRoles } from 'src/shared/enums';
import { createAddressSchema } from './addressDto';

export const idParamsSchema = z.object({
  id: z.string({ required_error: 'id is required' }),
});

export const userBodySchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  name: z.string({ required_error: 'name is required' }),
  phoneNumber: z.string({ required_error: 'phoneNumber is required' }),
  role: z.nativeEnum(UserRoles, { required_error: 'role is enum: [admin, customer, employee]' }),
  address: createAddressSchema.optional(),
});

export const createUserSchema = z.object({
  body: userBodySchema,
});

export type CreateUserDto = TypeOf<typeof createUserSchema>;

export const updateUserSchema = z.object({
  params: idParamsSchema,
  body: userBodySchema.partial(),
});

export type UpdateUserDto = TypeOf<typeof updateUserSchema>;
