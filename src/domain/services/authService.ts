import { User } from 'src/infrastructure/database/schemas';
import { UserRoles } from 'src/shared/enums';
import { TokenType } from 'src/shared/types';
export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
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

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<User>;
  login(loginDto: LoginDto): Promise<TokenType>;
  logout(userId: number): Promise<boolean>;
  refreshToken(userId: number, refreshToken: string, role: UserRoles): Promise<TokenType>;
  me(userId: number): Promise<User>;
}
