import { Product } from '../../admin/product/models/models';

export interface CartItem {
    amount: number;
    product: Product;
  }