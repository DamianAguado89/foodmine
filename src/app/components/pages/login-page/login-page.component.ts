import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TitleComponent } from '../../partials/title/title.component';
import { UserService } from '../../../services/user.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    TitleComponent,
    TextInputComponent,
    DefaultButtonComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder, 
    private userService: UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return

    this.userService.login({email: this.fc.email.value, password: this.fc.password.value}).subscribe(() =>{
      this.router.navigateByUrl(this.returnUrl);
    });

  }


}
