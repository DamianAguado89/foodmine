import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-items-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.scss'
})
export class OrderItemsListComponent {
  @Input() order!:Order;
}
