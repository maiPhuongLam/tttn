import { relations } from 'drizzle-orm';
import { addresses } from './address';
import { users } from './user';
import { brands } from './brand';
import { categories } from './category';
import { products } from './product';
import { warrantyPolicies } from './warrantyPolicy';
import { admins } from './admin';
import { carts } from './cart';
import { cartItems } from './cartItem';
import { productItems } from './productItem';
import { customers } from './customer';
import { warrantyRequests } from './warrantyRequest';
import { orders } from './order';
import { orderDetails } from './orderDetail';
import { productDetails } from './productDetail';
import { warrantyCases } from './warrantyCase';
import { warrantyCasesPolices } from './warrantyCasePolicy';
import { warrantyDetails } from './warrantyDetail';
import { productSerials } from './productSerial';

const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users),
}));

const adminRelations = relations(users, ({ many }) => ({
  brands: many(brands),
  categories: many(categories),
  products: many(products),
  warrantyPolicies: many(warrantyPolicies),
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
    warrantyRequests: many(warrantyRequests),
    orders: many(orders),
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

const productSerialRelations = relations(productSerials, ({ one }) => ({
  productItem: one(productItems, {
    fields: [productSerials.productItemId],
    references: [productItems.productId],
  }),
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
  warrantyCasePolices: many(warrantyCasesPolices),
  admin: one(admins, {
    fields: [warrantyCases.adminId],
    references: [admins.id],
  }),
  warrantyDetail: many(warrantyDetails),
}));

const warrantyCasesPolicesRelations = relations(warrantyCasesPolices, ({ one }) => ({
  warrantyPolicy: one(warrantyPolicies, {
    fields: [warrantyCasesPolices.warrantyPolicyId],
    references: [warrantyPolicies.id],
  }),
  warrantyCase: one(warrantyCases, {
    fields: [warrantyCasesPolices.warrantyCaseId],
    references: [warrantyCases.id],
  }),
}));

const warrantyDetailRelations = relations(warrantyDetails, ({ one }) => ({
  warrantyRequest: one(warrantyRequests, {
    fields: [warrantyDetails.warrantyRequestId],
    references: [warrantyRequests.id],
  }),
  warrantyPolicy: one(warrantyPolicies, {
    fields: [warrantyDetails.warrantyPolicyId],
    references: [warrantyPolicies.id],
  }),
}));

const warrantyPolicyRelations = relations(warrantyPolicies, ({ many, one }) => ({
  product: one(products, {
    fields: [warrantyPolicies.productId],
    references: [products.id],
  }),
  admin: one(admins, {
    fields: [warrantyPolicies.adminId],
    references: [admins.id],
  }),
  warrantyDetail: many(warrantyDetails),
  warrantyCases: many(warrantyCasesPolices),
}));

const warrantyRequestRelations = relations(warrantyRequests, ({ many, one }) => ({
  customer: one(customers, {
    fields: [warrantyRequests.customerId],
    references: [customers.id],
  }),
  products: one(products, {
    fields: [warrantyRequests.productId],
    references: [products.id],
  }),
  warrantyDetail: many(warrantyDetails),
}));
