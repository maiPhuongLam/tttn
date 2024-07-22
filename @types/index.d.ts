import * as express from 'express';
import { UserRoles } from 'src/shared/enums';

declare global {
  namespace Express {
    interface Request {
      userId: number;
      role: UserRoles;
      rawBody?: string; 
    }
  }
}

// This is to ensure the file is treated as a module
export {};
