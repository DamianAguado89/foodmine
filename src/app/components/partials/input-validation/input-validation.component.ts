import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email: 'email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}
@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements OnInit, OnChanges{

  @Input() control!:AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  constructor(){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  
  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() =>{
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return
    }

    const erorKeys = Object.keys(errors);
    this.errorMessages = erorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
