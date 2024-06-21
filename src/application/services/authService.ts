import { inject, injectable } from 'inversify';
import { IAdminService, IAuthService, ICustomerService } from 'src/domain/services';
import { INTERFACE_NAME } from 'src/shared/constants';
import { UserRoles } from 'src/shared/enums';
import { TokenType } from 'src/shared/types';
import { LoginDto, RegisterDto } from '../dtos';
import { User } from 'src/infrastructure/database/schemas';
import { BadRequestError } from 'src/shared/errors';
import {
  compare,
  hash,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from 'src/shared/utils';
import { IAddressService } from 'src/domain/services/addressService';
import { IUserRepository } from 'src/domain/repositories';
import createRoleQueue from 'src/infrastructure/workers';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(INTERFACE_NAME.UserRepository) private userRepository: IUserRepository,
    @inject(INTERFACE_NAME.AddressService) private addressService: IAddressService,
    @inject(INTERFACE_NAME.CustomerService) private customerService: ICustomerService,
    @inject(INTERFACE_NAME.AdminService) private adminService: IAdminService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const { address } = registerDto;
      const emailExisted = await this.userRepository.findByEmail(registerDto.email);
      if (emailExisted) {
        throw new BadRequestError('Email has been used to register another account');
      }

      const phoneExisted = await this.userRepository.findByPhoneNumber(registerDto.phoneNumber);
      if (phoneExisted) {
        throw new BadRequestError('Phone number has been used to register another account');
      }

      registerDto.password = await hash(registerDto.password);
      const userAddress = await this.addressService.createAddress(address);
      const newUser = await this.userRepository.add({
        ...registerDto,
        addressId: userAddress.id,
        rt: null,
      });
      if (registerDto.role === UserRoles.CUSTOMER) {
        await createRoleQueue.add('createRole', {
          role: UserRoles.CUSTOMER,
          userId: newUser.id,
          createService: this.customerService.createCustomer,
        });
      } else {
        await createRoleQueue.add('createRole', {
          role: UserRoles.ADMIN,
          userId: newUser.id,
          createService: this.adminService.createAdmin,
        });
      }

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<TokenType> {
    try {
      const user = await this.userRepository.findByEmail(loginDto.email);
      if (!user) {
        throw new BadRequestError('Email is incorrect');
      }

      const matchPassword = await compare(loginDto.password, user.password);
      if (!matchPassword) {
        throw new BadRequestError('Password is incorrect');
      }

      const role = await this.checkAdminOrCustomer(user.id);
      const token = this.generateToken(user.id, role);
      await this.updateRefreshTokenHash(user.id, token.refresh_token);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user?.rt) {
        throw new BadRequestError('User does not have a refresh token');
      }

      await this.userRepository.update(userId, { rt: null });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(userId: number, refreshToken: string, role: UserRoles): Promise<TokenType> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user?.rt || !compare(refreshToken, user.rt)) {
        throw new BadRequestError('Invalid or missing refresh token');
      }

      const token = this.generateToken(user.id, role);
      await this.updateRefreshTokenHash(user.id, token.refresh_token);
      return token;
    } catch (error) {
      throw error;
    }
  }

  private async checkAdminOrCustomer(userId: number): Promise<UserRoles> {
    const customer = await this.customerService.findByUserId(userId);
    return customer ? UserRoles.CUSTOMER : UserRoles.ADMIN;
  }

  private async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashData = await hash(refreshToken);
    await this.userRepository.update(userId, { rt: hashData });
  }

  private generateToken(userId: number, role: UserRoles): TokenType {
    const accessToken = signAccessToken(userId, role);
    const refreshToken = signRefreshToken(userId, role);
    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
