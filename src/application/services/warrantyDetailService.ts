import { inject, injectable } from 'inversify';
import { IWarrantyDetailRepository } from 'src/domain/repositories'; // Interface for WarrantyDetailRepository
import { IWarrantyDetailService } from 'src/domain/services';
import { WarrantyDetail } from 'src/infrastructure/database/schemas';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class WarrantyDetailService implements IWarrantyDetailService {
  constructor(
    @inject('IWarrantyDetailRepository')
    private warrantyDetailRepository: IWarrantyDetailRepository,
  ) {}

  async createWarrantyDetail(warrantyDetailData: Omit<WarrantyDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<WarrantyDetail> {
    try {
      return await this.warrantyDetailRepository.add(warrantyDetailData);
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyDetails(): Promise<WarrantyDetail[]> {
    try {
      return await this.warrantyDetailRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getWarrantyDetailById(id: number): Promise<WarrantyDetail> {
    try {
      const warrantyDetail = await this.warrantyDetailRepository.findById(id);
      if (!warrantyDetail) {
        throw new NotFoundError('Warranty detail not found'); // Assuming an error class for "Not Found" scenarios
      }
      return warrantyDetail;
    } catch (error) {
      throw error;
    }
  }

  async updateWarrantyDetail(
    id: number,
    updateWarrantyDetailData: Partial<WarrantyDetail>,
  ): Promise<WarrantyDetail> {
    try {
      await this.getWarrantyDetailById(id); // Check if exists before update
      return await this.warrantyDetailRepository.update(id, updateWarrantyDetailData);
    } catch (error) {
      throw error;
    }
  }

  async deleteWarrantyDetail(id: number): Promise<void> {
    try {
      await this.getWarrantyDetailById(id); // Check if exists before delete
      await this.warrantyDetailRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}