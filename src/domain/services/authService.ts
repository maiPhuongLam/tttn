import { LoginDto, RegisterDto } from 'src/application/dtos';
import { User } from 'src/infrastructure/database/schemas';
import { UserRoles } from 'src/shared/enums';
import { TokenType } from 'src/shared/types';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<User>;
  login(loginDto: LoginDto): Promise<TokenType>;
  logout(userId: number): Promise<boolean>;
  refreshToken(userId: number, refreshToken: string, role: UserRoles): Promise<TokenType>;
}
