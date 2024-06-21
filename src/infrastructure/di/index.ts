import { Container } from 'inversify';
import {
  IAddressRepository,
  IAdminRepository,
  ICustomerRepository,
  IUserRepository,
} from 'src/domain/repositories';
import {
  IAddressService,
  IAdminService,
  IAuthService,
  ICustomerService,
} from 'src/domain/services';
import { INTERFACE_NAME } from 'src/shared/constants';
import {
  AddressRepository,
  AdminRepository,
  CustomerRepository,
  UserRepository,
} from '../database/repositories';
import { AddressService, AuthService, CustomerService } from 'src/application/services';
import { AuthController } from 'src/application/api/controllers';
import { AdminService } from 'src/application/services/adminService';

const container = new Container();

container.bind<IUserRepository>(INTERFACE_NAME.UserRepository).to(UserRepository);
container.bind<IAuthService>(INTERFACE_NAME.AuthService).to(AuthService);
container.bind(INTERFACE_NAME.AuthController).to(AuthController);
container.bind<IAddressRepository>(INTERFACE_NAME.AddressRepository).to(AddressRepository);
container.bind<IAddressService>(INTERFACE_NAME.AddressService).to(AddressService);
container.bind<ICustomerRepository>(INTERFACE_NAME.CustomerRepository).to(CustomerRepository);
container.bind<ICustomerService>(INTERFACE_NAME.CustomerService).to(CustomerService);
container.bind<IAdminRepository>(INTERFACE_NAME.AdminRepository).to(AdminRepository);
container.bind<IAdminService>(INTERFACE_NAME.AdminService).to(AdminService);
// container.bind(INTERFACE_NAME.AddressController).to(AddressController)

export default container;
