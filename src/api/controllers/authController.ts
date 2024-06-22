import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { LoginDto, RefreshTokenDto, RegisterDto } from 'src/application/dtos';
import { IAuthService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';

@injectable()
export class AuthController {
  constructor(@inject(INTERFACE_NAME.AuthService) private authService: IAuthService) {}

  async resigter(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <RegisterDto>req.body;
      const data = await this.authService.register(body);
      const response = {
        success: true,
        message: 'Register successfully',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      logger.error('Register User Error', error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <LoginDto>req.body;
      const data = await this.authService.login(body);
      const response = {
        success: true,
        message: 'Login successfully',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Login Error', error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const data = await this.authService.logout(userId);
      const response = {
        success: true,
        message: 'Logout successfully',
        data,
      };
      return res.status(200).json(response);
    } catch (error) {
      logger.error('Logout error', error);
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role, body } = req;
      const { refreshToken } = <RefreshTokenDto>body;
      const data = await this.authService.refreshToken(userId, refreshToken, role);
      const response = {
        success: true,
        message: 'Refresh token successfully',
        data,
      };
      return res.status(200).json(response);
    } catch (error) {
      logger.error('Refresh token error', error);
      next(error);
    }
  }
}
