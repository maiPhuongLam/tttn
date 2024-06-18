import { TypeOf, z } from 'zod';
import { userBodySchema } from './userDto';

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export type LoginDto = TypeOf<typeof loginSchema>;

export const registerSchema = z.object({
  body: userBodySchema,
});

export type RegisterDto = TypeOf<typeof registerSchema>;
