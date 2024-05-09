import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterModule, CommonModule, StarRatingComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {

  food!:Food;
  constructor(activatedRouter:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router){
    activatedRouter.params.subscribe((params)=>{
      if(params.id){
       
        foodService.getFoodById(params.id).subscribe(serveFood =>{
          this.food = serveFood;
        });
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
