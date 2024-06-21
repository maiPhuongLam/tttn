import { TypeOf, z } from 'zod';
import { UserRoles } from 'src/shared/enums';
import { addressBodySchema, createAddressSchema } from './addressDto';

export const idParamsSchema = {
  id: z.string({ required_error: 'id is required' }),
};

export const userBodySchema = {
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  name: z.string({ required_error: 'name is required' }),
  phoneNumber: z.string({ required_error: 'phoneNumber is required' }),
  role: z.nativeEnum(UserRoles, { required_error: 'role is enum: [admin, customer]' }),
  address: z.object({ ...addressBodySchema }),
};

export const createUserSchema = z.object({
  body: z.object(userBodySchema),
});

export type CreateUserDto = TypeOf<typeof createUserSchema>['body'];

export const updateUserSchema = z.object({
  params: z.object(idParamsSchema),
  body: z.object(userBodySchema).partial(),
});

export type UpdateUserDto = TypeOf<typeof updateUserSchema>['body'];
