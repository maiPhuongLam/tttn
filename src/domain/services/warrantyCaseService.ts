import { WarrantyCase } from 'src/infrastructure/database/schemas';

export type CreateWarrantyCaseDto = {
  name: string;
};

export type UpdateWarrantyCaseDto = Partial<CreateWarrantyCaseDto>;

export interface IWarrantyCaseService {
  createWarrantyCase(createWarrantyCaseDto: CreateWarrantyCaseDto): Promise<WarrantyCase>;
  getWarrantyCases(): Promise<WarrantyCase[]>;
  getOneWarrantyCase(id: number): Promise<WarrantyCase>;
  updateWarrantyCase(
    id: number,
    updateWarrantyCaseDto: UpdateWarrantyCaseDto,
  ): Promise<WarrantyCase>;
  deleteWarrantyCase(id: number): Promise<WarrantyCase>;
}
