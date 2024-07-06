import { Brand } from 'src/infrastructure/database/schemas';

type CreateBrandDto = {
  name: string;
};
type UpdateBrandDto = Partial<CreateBrandDto>;

export interface IBrandService {
  getBrands(): Promise<Brand[]>;
  getOneBrand(id: number): Promise<Brand>;
  createBrand(createBrandDto: CreateBrandDto, userId: number): Promise<Brand>;
  updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  deleteBrand(id: number): Promise<Brand>;
}
