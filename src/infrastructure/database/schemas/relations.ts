import { relations } from 'drizzle-orm';
import { addresses } from './address';
import { users } from './user';
import { brands } from './brand';
import { categories } from './category';
import { products } from './product';
import { admins } from './admin';
import { carts } from './cart';
import { cartItems } from './cartItem';
import { productItems } from './productItem';
import { customers } from './customer';
import { orders } from './order';
import { orderDetails } from './orderDetail';
import { productDetails } from './productDetail';
import { warrantyCases } from './warrantyCase';
import { warrantyDetails } from './warrantyDetail';
import { productSerials } from './productSerial';
import { warranties } from './warranty';

const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users),
}));

const adminRelations = relations(users, ({ many }) => ({
  brands: many(brands),
  categories: many(categories),
  products: many(products),
}));

const brandRelations = relations(brands, ({ many, one }) => ({
  products: many(products),
  admin: one(admins, {
    fields: [brands.adminId],
    references: [admins.id],
  }),
}));

const cartRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));

const cartItemRelations = relations(cartItems, ({ one, many }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  productItem: one(productItems, {
    fields: [cartItems.productItemId],
    references: [productItems.id],
  }),
}));

const categoryRelations = relations(categories, ({ many, one }) => ({
  products: many(products),
  admin: one(admins, {
    fields: [categories.adminId],
    references: [admins.id],
  }),
}));

const customerRelations = relations(customers, ({ one, many }) => {
  return {
    cart: one(customers),
    orders: many(orders),
    warrantyDetails: many(warrantyDetails),
  };
});

const orderRelations = relations(orders, ({ one, many }) => ({
  customers: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  orderDetails: many(orderDetails),
}));

const orderDetailRelations = relations(orderDetails, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderDetails.orderId],
    references: [orders.id],
  }),
  productSerial: one(productSerials, {
    fields: [orderDetails.productSerial],
    references: [productSerials.serialNumber],
  }),
}));

const productRelations = relations(products, ({ one, many }) => ({
  admin: one(admins, {
    fields: [products.adminId],
    references: [admins.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productItems: many(productItems),
}));

const productItemRelations = relations(productItems, ({ one, many }) => ({
  product: one(products, {
    fields: [productItems.productId],
    references: [products.id],
  }),
  productSerials: many(productSerials),
}));

const productSerialRelations = relations(productSerials, ({ one, many }) => ({
  productItem: one(productItems, {
    fields: [productSerials.productItemId],
    references: [productItems.productId],
  }),
  warrantyDetails: many(warrantyDetails),
}));

const productDetailRelations = relations(productDetails, ({ one }) => ({
  product: one(products, {
    fields: [productDetails.id],
    references: [products.featureId],
  }),
}));

const userRelations = relations(users, ({ one }) => ({
  admin: one(admins),
  customer: one(customers),
}));

const warrantyCaseRelations = relations(warrantyCases, ({ many, one }) => ({
  warrantyDetails: many(warrantyDetails),
}));

const warrantyRelations = relations(warranties, ({ many, one }) => ({
  warrantyDetails: many(warrantyDetails),
}));

const warrantyDetailRelations = relations(warrantyDetails, ({ one }) => ({
  warrantyCase: one(warrantyCases, {
    fields: [warrantyDetails.warrantyCaseId],
    references: [warrantyCases.id],
  }),
  productSerial: one(productSerials, {
    fields: [warrantyDetails.productSerial],
    references: [productSerials.id],
  }),
  warranty: one(warranties, {
    fields: [warrantyDetails.warrantyId],
    references: [warranties.id],
  }),
}));
