import { User } from 'src/infrastructure/database/schemas';
import { UserRoles } from 'src/shared/enums';

type CreateUserDto = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: UserRoles;
  address: {
    streetAddress: string;
    wardOrCommune: string;
    district: string;
    cityOrProvince: string;
  };
};
type UpdateUserDto = Partial<CreateUserDto>;

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  updateUser(updateUserDto: UpdateUserDto): Promise<User>;
}
