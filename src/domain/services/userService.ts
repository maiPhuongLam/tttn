import { User } from 'src/infrastructure/database/schemas';
import { UserRoles } from 'src/shared/enums';

type CreateUserData = {
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
type UpdateUserData = Partial<CreateUserData>;

export interface IUserService {
  createUser(createUserData: CreateUserData): Promise<User>;
  updateUser(updateUserData: UpdateUserData): Promise<User>;
}
