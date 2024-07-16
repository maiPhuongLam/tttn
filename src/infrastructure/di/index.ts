import { Container } from 'inversify';
import {
  IAddressRepository,
  IAdminRepository,
  IBrandRepository,
  ICategoryRepository,
  ICustomerRepository,
  IProductDetailRepository,
  IProductItemRepository,
  IProductRepository,
  IUserRepository,
} from 'src/domain/repositories';
import {
  IAddressService,
  IAdminService,
  IAuthService,
  IBrandService,
  ICategoryService,
  ICustomerService,
  IProductDetailService,
  IProductItemService,
  IProductService,
} from 'src/domain/services';
import { INTERFACE_NAME } from 'src/shared/constants';
import {
  AddressRepository,
  AdminRepository,
  BrandRepository,
  CategoryRepository,
  CustomerRepository,
  ProductDetailRepository,
  ProductItemRepository,
  ProductRepository,
  UserRepository,
} from '../database/repositories';
import {
  AddressService,
  AdminService,
  AuthService,
  BrandService,
  CategoryService,
  CustomerService,
  ProductDetailService,
  ProductItemService,
  ProductService,
} from 'src/application/services';
import {
  AuthController,
  BrandController,
  CategoryController,
  ProductController,
  ProductItemController,
} from 'src/presentation/controllers';

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
container.bind<IProductRepository>(INTERFACE_NAME.ProductRepository).to(ProductRepository);
container.bind<IProductService>(INTERFACE_NAME.ProductService).to(ProductService);
container.bind(INTERFACE_NAME.ProductController).to(ProductController);
container
  .bind<IProductItemRepository>(INTERFACE_NAME.ProductItemRepository)
  .to(ProductItemRepository);
container.bind<IProductItemService>(INTERFACE_NAME.ProductItemService).to(ProductItemService);
container.bind(INTERFACE_NAME.ProductItemController).to(ProductItemController);
container
  .bind<IProductDetailRepository>(INTERFACE_NAME.ProductDetailRepository)
  .to(ProductDetailRepository);
container.bind<IProductDetailService>(INTERFACE_NAME.ProductDetailService).to(ProductDetailService);
container.bind<IBrandRepository>(INTERFACE_NAME.BrandRepository).to(BrandRepository);
container.bind<IBrandService>(INTERFACE_NAME.BrandService).to(BrandService);
container.bind(INTERFACE_NAME.BrandController).to(BrandController);
container.bind<ICategoryRepository>(INTERFACE_NAME.CategoryRepository).to(CategoryRepository);
container.bind<ICategoryService>(INTERFACE_NAME.CategoryService).to(CategoryService);
container.bind(INTERFACE_NAME.CategoryController).to(CategoryController);

export default container;
