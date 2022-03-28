import { Product } from '../../admin/product/models/models';

export interface Item {
    amount: number;
    productId: string;
}

export interface OrderAddress {
    street: string,
    cep: string,
    number: string,
    district: string
  }
export interface Order {
    _id: string;
    orderAddress: OrderAddress;
    itemsList: Item[];
    paymentMode: string;
    state: ORDER_STATE;
    timeline: OrderTimeline[];
    userId: string;
    items: Product[];
}


export interface OrderTimeline {
    date: string;
    userId: string;
    state: ORDER_STATE;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type PAYMENT_MODE = 'MONEY' | 'CART' | 'PIX';
// eslint-disable-next-line @typescript-eslint/naming-convention
export type ORDER_FINISHED = 'CANCELLED' | 'DELIVERED' | 'UNDELIVERED';
// eslint-disable-next-line @typescript-eslint/naming-convention
export type ORDER_STATE =
  | 'ORDER'
  | 'SEPARATING'
  | 'READY'
  | 'DELIVERY'
  | ORDER_FINISHED;

