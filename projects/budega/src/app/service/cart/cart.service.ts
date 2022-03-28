import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: string[];

  constructor(private localStorage: LocalStorageService) {
    this.cart = this.localStorage.getItem('public_cart') ?? [];
  }

  // TODO: add to user cart
  addToCart(productId: string): void {
    // TODO: Check if user is logged in
    try {
      const lcCart = this.localStorage.getItem('public_cart');
      this.cart.push(productId);
      this.localStorage.setItem('public_cart', this.cart);
    } catch (e) {
      console.error('Cant save localStorage Cart');
    }
  }

  removeToCart(productId: string): void {
    // TODO: Check if user is logged in
    try {
      this.cart = this.localStorage.getItem('public_cart').split(',');
      this.localStorage.setItem('public_cart', this.cart);
    } catch (e) {
      console.error('Cant save localStorage Cart');
    }
  }
}
