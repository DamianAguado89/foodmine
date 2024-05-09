import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { TitleComponent } from '../../partials/title/title.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-order-track-page',
  standalone: true,
  imports: [ CommonModule, 
            RouterModule, 
            ReactiveFormsModule,
            OrderItemsListComponent,
            TitleComponent,
            MapComponent],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.scss'
})
export class OrderTrackPageComponent {
  
  order!:Order;
  constructor(activateRouter: ActivatedRoute, 
              orderService:OrderService){
    const params = activateRouter.snapshot.params;
    if(!params.orderId) return;

    orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
}
}
