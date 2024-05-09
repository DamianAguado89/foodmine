import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    TitleComponent,
    TextInputComponent, 
    OrderItemsListComponent,
    MapComponent,
    PaypalButtonComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent {

  order:Order = new Order();
  constructor(orderService:OrderService, router:Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/chekcout');
      }
    })
  }
}
