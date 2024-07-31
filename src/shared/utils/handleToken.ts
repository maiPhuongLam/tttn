import { Request } from 'express';
import jwt from 'jsonwebtoken';
import configuration from 'src/config/configuration';
import { UnAuthorizedError } from '../errors';
import logger from 'src/infrastructure/logger';
import { UserRoles } from '../enums';

// Destructure the JWT secrets from configuration
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = configuration;

// Ensure the secret keys are defined
if (!JWT_ACCESS_SECRET_KEY || !JWT_REFRESH_SECRET_KEY) {
  throw new Error('JWT secret keys are not defined in the configuration');
}

// Signing and verifying tokens
export const signAccessToken = (id: number, role: UserRoles): string => {
  const payload = { id, role };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_ACCESS_SECRET_KEY, options);
};

export const signRefreshToken = (id: number, role: UserRoles): string => {
  const payload = { id, role };
  const options = { expiresIn: '7d' };
  return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, options);
};

export const verifyAccessToken = (token: string): { id: number; role: UserRoles } => {
  return jwt.verify(token, JWT_ACCESS_SECRET_KEY) as { id: number; role: UserRoles };
};

export const verifyRefreshToken = (token: string): { id: number; role: UserRoles } => {
  return jwt.verify(token, JWT_REFRESH_SECRET_KEY) as { id: number; role: UserRoles };
};

// Middleware to verify access token from the request
export const verifyAccessTokenFromRequest = (req: Request): { id: number; role: UserRoles } => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    throw new UnAuthorizedError('Missing authorization token');
  }

  const token = authorizationHeader.split(' ')[1];
  try {
    return verifyAccessToken(token);
  } catch (error: any) {
    logger.error('Error verify access token from request');
    throw new UnAuthorizedError(error.message);
  }
};

export const verifyRefreshTokenFromRequest = (req: Request): { id: number; role: UserRoles } => {
  const refresh_token = req.query.refresh_token as string;
  if (!refresh_token) {
    throw new UnAuthorizedError('Missing refresh_token');
  }

  try {
    return verifyRefreshToken(refresh_token);
  } catch (error: any) {
    logger.error('Error verify refresh token from request');
    throw new UnAuthorizedError(error.message);
  }
};
