// export interface CheckoutDetailDto {
//   skuId: string;
//   skuPriceId: string;
//   quantity: number;
// }
export type CheckoutDto = {
  quantity: number;
  SKU: string;
}[];

export interface IOrderService {
  checkout(checkoutDto: CheckoutDto, customerId: number): Promise<string>;
  webhookHandler(body: any, sig: string): Promise<void>;
}
