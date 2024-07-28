import { WarrantyRequest } from "src/infrastructure/database/schemas";

export type CreateWarrantyRequestDto = {
  customerId: number;
  productSerial: string;
  status: "pending" | "warrantying" | "refused" | "successed";
  issueDescription: string
}

export type UpdateWarrantyRequestDto = Partial<CreateWarrantyRequestDto>

export interface IWarrantyRequestService {
  createWarrantyRequest(warrantyRequestData: CreateWarrantyRequestDto): Promise<WarrantyRequest>;
  getWarrantyRequests(): Promise<WarrantyRequest[]>;
  getWarrantyRequestById(id: number): Promise<WarrantyRequest>;
  updateWarrantyRequest(id: number, updateWarrantyRequestData: UpdateWarrantyRequestDto): Promise<WarrantyRequest>;
  deleteWarrantyRequest(id: number): Promise<void>;
}