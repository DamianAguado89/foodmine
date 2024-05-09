import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() title!:string;
  @Input() margin? = '1rem 0 1rem 0.2rem';
  @Input() fontSize = '1.7rem';

  constructor(){}

}
