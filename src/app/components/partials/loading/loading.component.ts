import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading!: boolean;
  constructor(loadingService: LoadingService){
    loadingService.isLoading.subscribe((isLoading)=>{
      this.isLoading = isLoading;
    });
    // loadingService.showLoading()
  }
}
