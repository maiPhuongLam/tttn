import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IWarrantyCaseService, IWarrantyPolicyService } from 'src/domain/services';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';

@injectable()
export class WarrantyController {
  constructor(
    @inject(INTERFACE_NAME.WarrantyCaseService) private warrantyCaseService: IWarrantyCaseService,
    @inject(INTERFACE_NAME.WarrantyPolicyService) private warrantyPolicyService: IWarrantyPolicyService,

  ) {}

  async createWarrantyCase(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const userId = req.userId
      const data = await this.warrantyCaseService.createWarrantyCase(body, userId);
      const response = {
        success: true,
        message: 'Create Warranty case is successful',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getWarrantyCases(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.warrantyCaseService.getWarrantyCases();
      const response = {
        success: true,
        message: 'Get Warranty cases is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOneWarrantyCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.warrantyCaseService.getOneWarrantyCase(Number(id));
      const response = {
        success: true,
        message: 'Create One Warranty case is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateWarrantyCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await this.warrantyCaseService.updateWarrantyCase(Number(id), body);
      const response = {
        success: true,
        message: 'Update Warranty case is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteWarrantyCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.warrantyCaseService.deleteWarrantyCase(Number(id));
      const response = {
        success: true,
        message: 'Delete Warranty case is successful',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async addWarrantyPolicy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId= req.userId
      const body = req.body
      const data = await this.warrantyPolicyService.createWarrantyPolicy(body, userId);
      const response = {
        success: true,
        message: 'Delete Warranty case is successful',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getWarrantyPolicies(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.warrantyPolicyService.getWarrantyPolicies();
      const response = {
        success: true,
        message: 'Get Warranty polices is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error)
    }
  }

  async getWarrantyPolicy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.warrantyPolicyService.getWarrantyPolicyById(+id);
      const response = {
        success: true,
        message: 'Get Warranty poliy is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error)
    }
  }

  async deleteWarrantyPolicy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.warrantyPolicyService.deleteWarrantyPolicy(+id);
      const response = {
        success: true,
        message: 'Delete Warranty poliy is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      next(error)
    }
  }
}
