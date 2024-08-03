import { and, eq } from 'drizzle-orm';
import { PgEnum } from 'drizzle-orm/pg-core';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IWarrantyCaseService, IWarrantyPolicyService } from 'src/domain/services';
import { DB } from 'src/infrastructure/database/connect';
import {
  customers,
  users,
  WarrantyCase,
  warrantyCases,
  WarrantyDetail,
  warrantyDetails,
} from 'src/infrastructure/database/schemas';
import { warranties } from 'src/infrastructure/database/schemas/warranty';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/types/baseResponse';

enum WarrantyStatus {
  TN = 'Tiếp nhận',
  ĐBH = 'Đang bảo hành',
  BHX = 'Bảo hành xong',
  ĐBG = 'Đã bàn giao',
}

type Detail = {
  productSerial: string;
  warrantyCaseId: number;
  cost: number;
};

type CombinedWarranty = {
  id: number;
  total_cost: string;
  repair_date: Date;
  appointment_date: Date;
  customer_name: string;
  customer_phone: string;
  status: any;
  details: {
    product_serial: string;
    warranty_case: string;
    cost: string;
  }[];
};
@injectable()
export class WarrantyController {
  constructor(
    @inject(INTERFACE_NAME.WarrantyCaseService) private warrantyCaseService: IWarrantyCaseService,
    @inject(INTERFACE_NAME.WarrantyPolicyService)
    private warrantyPolicyService: IWarrantyPolicyService,
  ) {}

  async createWarrantyCase(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const userId = req.userId;
      const data = await this.warrantyCaseService.createWarrantyCase(body);
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

  async createWarranty(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const details = <Detail[]>req.body.details;
      const [user] = await DB.select({ id: users.id })
        .from(users)
        .where(and(eq(users.name, req.body.name), eq(users.phoneNumber, req.body.phone)));
      if (!user) {
        throw new NotFoundError('User not found');
      }

      const [customer] = await DB.select({ id: customers.id })
        .from(customers)
        .where(eq(customers.userId, user.id));
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      const totalCost = details.reduce(
        (accumulator, currentValue) => accumulator + currentValue.cost,
        0,
      );
      
      const [warranty] = await DB.insert(warranties)
        .values({
          totalCost: totalCost.toString(),
          customerId: customer.id,
          repairDate: new Date(req.body.repairDate),
          appointmentDate: new Date(req.body.appointmentDate),
          status: 'Tiếp nhận',
        })
        .returning()
        .execute();
      for (let i = 0; i < details.length; i++) {
        await DB.insert(warrantyDetails).values({
          cost: details[0].cost.toString(),
          warrantyCaseId: details[0].warrantyCaseId,
          productSerial: details[0].productSerial,
          warrantyId: warranty.id,
        });
      }
      const response = {
        success: true,
        message: 'Create Warranty is successful',
        data: warranty,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllWarranties(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DB.select().from(warranties).execute();
      return res.status(STATUS_CODES.OK).json(BaseResponse.success('Get warranties success', data));
    } catch (error) {
      next(error);
    }
  }

  async getWarrantyDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const warrantyMap = new Map<number, CombinedWarranty>();
      const id = req.params.id;
      const data = await DB.select({
        id: warranties.id,
        total_cost: warranties.totalCost,
        repair_date: warranties.repairDate,
        appointment_date: warranties.appointmentDate,
        status: warranties.status,
        customer_name: users.name,
        customer_phone: users.phoneNumber,
        product_serial: warrantyDetails.productSerial,
        cost: warrantyDetails.cost,
        warranty_case: warrantyCases.name,
      })
        .from(warranties)
        .where(eq(warranties.id, +id))
        .innerJoin(customers, eq(warranties.customerId, customers.id))
        .innerJoin(users, eq(users.id, customers.userId))
        .innerJoin(warrantyDetails, eq(warrantyDetails.warrantyId, warranties.id))
        .innerJoin(warrantyCases, eq(warrantyCases.id, warrantyDetails.warrantyCaseId))
        .execute();
      console.log(data)
      data.forEach((warranty) => {
        if (!warrantyMap.has(warranty.id)) {
          warrantyMap.set(warranty.id, {
            id: warranty.id,
            total_cost: warranty.total_cost,
            repair_date: warranty.repair_date,
            appointment_date: warranty.appointment_date,
            status: warranty.status,
            customer_name: warranty.customer_name,
            customer_phone: warranty.customer_phone,
            details: [],
          });
        }

        const combinedWarranty = warrantyMap.get(warranty.id)!;
        combinedWarranty.details.push({
          product_serial: warranty.product_serial,
          warranty_case: warranty.warranty_case,
          cost: warranty.cost,
        });
      });
      return res
        .status(STATUS_CODES.OK)
        .json(
          BaseResponse.success('Get warranty detail success', Array.from(warrantyMap.values())[0]),
        );
    } catch (error) {
      next(error);
    }
  }

  async updateWarranty(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DB.update(warranties).set({ status: req.body.status}).where(eq(warranties.id, +req.params.id)).returning().execute();
      return res
        .status(STATUS_CODES.OK)
        .json(
          BaseResponse.success('Update warranty detail success', data),
        );
      // return await this.getWarrantyDetail(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async deleteWarranty(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.delete(warrantyDetails).where(eq(warrantyDetails.warrantyId, +req.params.id)).execute()
      const data = await DB.delete(warranties).where(eq(warranties.id, +req.params.id)).execute();
      return res
        .status(STATUS_CODES.OK)
        .json(
          BaseResponse.success('delete warranty success', data),
        );
    } catch (error) {
      next(error);
    }
  }
}
