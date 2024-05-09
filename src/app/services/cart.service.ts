import { Inject, Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItems';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {
  }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem) return
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStore();
  }

  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStore();
  }

  changeQuantity(foodId: string, quantity: number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStore();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStore();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStore():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currenItem) => prevSum + currenItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currenItem) => prevSum + currenItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    if(typeof localStorage !== 'undefined') localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    let cartJson:any
    if (typeof localStorage !== 'undefined') {
      cartJson = localStorage.getItem('Cart')
      return cartJson? JSON.parse(cartJson): new Cart();
    } else {
      return new Cart()
    }
   
   
  }
}
