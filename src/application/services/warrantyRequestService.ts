import { inject, injectable } from 'inversify';
import { IWarrantyRequestRepository } from 'src/domain/repositories'; // Interface for WarrantyRequestRepository
import { IWarrantyRequestService, UpdateWarrantyRequestDto, CreateWarrantyRequestDto } from 'src/domain/services';
import { WarrantyRequest } from 'src/infrastructure/database/schemas';
import { NotFoundError } from 'src/shared/errors'; // Assuming an error class for "Not Found" scenarios
import { BasePropsType } from 'src/shared/types';

@injectable()
export class WarrantyRequestService implements IWarrantyRequestService {
  constructor(
    @inject('IWarrantyRequestRepository')
    private warrantyRequestRepository: IWarrantyRequestRepository,
  ) {}

  async createWarrantyRequest(warrantyRequestData: CreateWarrantyRequestDto): Promise<WarrantyRequest> {
    try {
      return await this.warrantyRequestRepository.add({
        ...warrantyRequestData,
        requestDate: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyRequests(): Promise<WarrantyRequest[]> {
    try {
      return await this.warrantyRequestRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyRequestById(id: number): Promise<WarrantyRequest> {
    try {
      const warrantyRequest = await this.warrantyRequestRepository.findById(id);
      if (!warrantyRequest) {
        throw new NotFoundError('Warranty request not found');
      }
      return warrantyRequest;
    } catch (error) {
      throw error;
    }
  }

  async updateWarrantyRequest(id: number, updateWarrantyRequestData: UpdateWarrantyRequestDto): Promise<WarrantyRequest> {
    try {
      await this.getWarrantyRequestById(id); // Check if exists before update
      return await this.warrantyRequestRepository.update(id, updateWarrantyRequestData);
    } catch (error) {
      throw error;
    }
  }

  async deleteWarrantyRequest(id: number): Promise<void> {
    try {
      await this.getWarrantyRequestById(id); // Check if exists before delete
      await this.warrantyRequestRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}