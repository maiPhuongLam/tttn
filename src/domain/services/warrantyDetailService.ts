import { WarrantyDetail } from 'src/infrastructure/database/schemas';

export interface IWarrantyDetailService {
  createWarrantyDetail(
    warrantyDetailData: Omit<WarrantyDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<WarrantyDetail>;
  getWarrantyDetails(): Promise<WarrantyDetail[]>;
  getWarrantyDetailById(id: number): Promise<WarrantyDetail>;
  updateWarrantyDetail(
    id: number,
    updateWarrantyDetailData: Partial<WarrantyDetail>,
  ): Promise<WarrantyDetail>;
  deleteWarrantyDetail(id: number): Promise<void>;
}
