import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, StarRatingComponent, SearchComponent, TagsComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  foods:Food[] = [];

  constructor(private foodServices: FoodService, activatedRouter:ActivatedRoute){
    let foodsObservalbe: Observable<Food[]>;
    activatedRouter.params.subscribe((params)=>{
      if(params.searchTerm)
      foodsObservalbe = this.foodServices.getAllFoodsBySearchTeam(params.searchTerm);
      else if(params.tag)
      foodsObservalbe = this.foodServices.getAllFoodsByTag(params.tag)
      else
      foodsObservalbe = this.foodServices.getAll();

      foodsObservalbe.subscribe((serveFoods)=> {
        this.foods = serveFoods;
      })
    })
  }
  
  ngOnInit(): void {
  }

}
