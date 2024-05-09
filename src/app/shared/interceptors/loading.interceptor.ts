import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable, tap } from 'rxjs';
var pendingRequests = 0;
export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn):Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  pendingRequests = pendingRequests + 1;
  const handleHideLoading = () => {
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0)
      loadingService.hideLoading();    
   }
  return next(req).pipe(
    tap({
      next:(event) => {
        if(event.type === HttpEventType.Response){
         handleHideLoading();
        }
      },
      error: (_)=>{
        handleHideLoading();
      }
    })
  )

};


