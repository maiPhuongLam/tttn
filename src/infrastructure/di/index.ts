import { Container } from 'inversify';
import {
  IAddressRepository,
  IAdminRepository,
  IBrandRepository,
  ICartItemRepository,
  ICartRepository,
  ICategoryRepository,
  ICustomerRepository,
  IOrderDetailRepository,
  IOrderRepository,
  IProductDetailRepository,
  IProductItemRepository,
  IProductRepository,
  IProductSerialRepository,
  IUserRepository,
  IWarrantyCaseRepository,
  IWarrantyPolicyRepository,
} from 'src/domain/repositories';
import {
  IAddressService,
  IAdminService,
  IAuthService,
  IBrandService,
  ICartItemService,
  ICartService,
  ICategoryService,
  ICustomerService,
  IOrderDetailService,
  IOrderService,
  IProductDetailService,
  IProductItemService,
  IProductSerialService,
  IProductService,
  IWarrantyPolicyService,
} from 'src/domain/services';
import { INTERFACE_NAME } from 'src/shared/constants';
import {
  AddressRepository,
  AdminRepository,
  BrandRepository,
  CartItemRepository,
  CartRepository,
  CategoryRepository,
  CustomerRepository,
  OrderDetailRepository,
  OrderRepository,
  ProductDetailRepository,
  ProductItemRepository,
  ProductRepository,
  ProductSerialRepository,
  UserRepository,
  WarrantyCaseRepository,
  WarrantyPolicyRepository,
} from '../database/repositories';
import {
  AddressService,
  AdminService,
  AuthService,
  BrandService,
  CartItemService,
  CartService,
  CategoryService,
  CustomerService,
  OrderDetailService,
  OrderService,
  ProductDetailService,
  ProductItemService,
  ProductSerialService,
  ProductService,
  StatisticService,
  WarrantyCaseService,
  WarrantyPolicyService,
} from 'src/application/services';
import {
  AuthController,
  BrandController,
  CartController,
  CategoryController,
  OrderController,
  ProductController,
  ProductItemController,
  StatisticController,
  WarrantyController,
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
container
  .bind<IProductSerialRepository>(INTERFACE_NAME.ProductSerialRepository)
  .to(ProductSerialRepository);
container.bind<IProductSerialService>(INTERFACE_NAME.ProductSerialService).to(ProductSerialService);
// container.bind(INTERFACE_NAME.ProductSerialController).to(ProductSerialController);
container.bind<IBrandRepository>(INTERFACE_NAME.BrandRepository).to(BrandRepository);
container.bind<IBrandService>(INTERFACE_NAME.BrandService).to(BrandService);
container.bind(INTERFACE_NAME.BrandController).to(BrandController);
container.bind<ICategoryRepository>(INTERFACE_NAME.CategoryRepository).to(CategoryRepository);
container.bind<ICategoryService>(INTERFACE_NAME.CategoryService).to(CategoryService);
container.bind(INTERFACE_NAME.CategoryController).to(CategoryController);
container.bind<ICartRepository>(INTERFACE_NAME.CartRepository).to(CartRepository);
container.bind<ICartService>(INTERFACE_NAME.CartService).to(CartService);
container.bind(INTERFACE_NAME.CartController).to(CartController);
container.bind<ICartItemRepository>(INTERFACE_NAME.CartItemRepository).to(CartItemRepository);
container.bind<ICartItemService>(INTERFACE_NAME.CartItemService).to(CartItemService);
container
  .bind<IOrderDetailRepository>(INTERFACE_NAME.OrderDetailRepository)
  .to(OrderDetailRepository);
container.bind<IOrderDetailService>(INTERFACE_NAME.OrderDetailService).to(OrderDetailService);
container.bind<IOrderRepository>(INTERFACE_NAME.OrderRepository).to(OrderRepository);
container.bind<IOrderService>(INTERFACE_NAME.OrderService).to(OrderService);
container.bind(INTERFACE_NAME.OrderController).to(OrderController);
container
  .bind<IWarrantyCaseRepository>(INTERFACE_NAME.WarrantyCaseRepository)
  .to(WarrantyCaseRepository);
container.bind(INTERFACE_NAME.WarrantyCaseService).to(WarrantyCaseService);
container.bind(INTERFACE_NAME.WarrantyController).to(WarrantyController);
container
  .bind<IWarrantyPolicyRepository>(INTERFACE_NAME.WarrantyPolicyRepository)
  .to(WarrantyPolicyRepository);
container.bind<IWarrantyPolicyService>(INTERFACE_NAME.WarrantyPolicyService).to(WarrantyPolicyService);
container.bind('StatisticService').to(StatisticService);
container.bind('StatisticController').to(StatisticController);

export default container;
