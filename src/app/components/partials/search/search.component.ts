import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm = '';
  constructor( activatedRouter: ActivatedRoute, private router:Router){
    activatedRouter.params.subscribe((params)=>{
      if(params.searchTerm) this.searchTerm = params.searchTerm
    })
  }

  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+term);
  }
}
