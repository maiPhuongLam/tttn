import { WarrantyPolicy } from 'src/infrastructure/database/schemas';

export type CreateWarrantyPolicyDto = {
  productId: number;
  warrantyPeriod: number;
  description: string
}

export type updateWarrantyPolicyDto = Partial<CreateWarrantyPolicyDto>

export interface IWarrantyPolicyService {
  createWarrantyPolicy(createWarrantyPolicyDto: CreateWarrantyPolicyDto, userId: number): Promise<WarrantyPolicy>;
  getWarrantyPolicies(): Promise<WarrantyPolicy[]>;
  getWarrantyPolicyByProductId(productId: number): Promise<WarrantyPolicy[]>;
  getWarrantyPolicyById(id: number): Promise<WarrantyPolicy>;
  updateWarrantyPolicy(id: number, updateWarrantyPolicyDto: updateWarrantyPolicyDto): Promise<WarrantyPolicy>;
  deleteWarrantyPolicy(id: number): Promise<void>;
}