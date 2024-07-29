import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { LoginDto, RefreshTokenDto, RegisterDto } from 'src/application/dtos';
import { IAuthService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { BaseResponse } from 'src/shared/types/baseResponse';

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
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Logout error', error);
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.query.refresh_token as string
      const data = await this.authService.refreshToken(req.userId, refreshToken, req.role);
      return res.status(STATUS_CODES.OK).json(BaseResponse.success('Refresh token successfully', data));
    } catch (error) {
      logger.error('Refresh token error', error);
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId
      const data = await this.authService.me(userId)
      return res.status(STATUS_CODES.OK).json(BaseResponse.success('Refresh token successfully', data));
    } catch (error) {
      logger.error('Refresh token error', error);
      next(error);
    }
  }
}
