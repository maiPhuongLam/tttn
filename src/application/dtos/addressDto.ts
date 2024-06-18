import { z, TypeOf } from 'zod';
import { idParamsSchema } from './userDto';

const addressBodySchema = z.object({
  streetAddress: z.string({ required_error: 'streetAddress is required' }),
  wardOrCommune: z.string({ required_error: 'wardOrCommune is required' }),
  district: z.string({ required_error: 'district is required' }),
  cityOrProvince: z.string({ required_error: 'cityOrProvince is required' }),
});

export const createAddressSchema = z.object({
  body: addressBodySchema,
});

export type CreateAddressDto = TypeOf<typeof createAddressSchema>;

export const updateAddressSchema = z.object({
  params: idParamsSchema,
  body: addressBodySchema.partial(),
});

export type UpdateAddressDto = TypeOf<typeof updateAddressSchema>;
