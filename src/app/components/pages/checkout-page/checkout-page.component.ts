import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [   
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    TitleComponent,
    TextInputComponent, 
    OrderItemsListComponent,
    MapComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit{
  order:Order = new Order();
  checkoutForm!: FormGroup;

  constructor(cartServer:CartService, 
              private formBuilder: FormBuilder, 
              private toastrService: ToastrService, 
              private userService:UserService,
              private orderService: OrderService,
              private router: Router){
    const cart = cartServer.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Input');
      return
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning('Please select you location on the map', 'Location');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next:()=>{
        this,this.router.navigateByUrl('/payment');
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
  
}
