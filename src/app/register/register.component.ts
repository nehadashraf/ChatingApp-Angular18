import { CommonModule } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private FB =inject(FormBuilder);
  private router =inject(Router)
  cancelRegister = output<boolean>();
  validationErrors: string[] = [];
  registerForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
  this.intializeForm();
  }
  intializeForm() {
    this.registerForm = this.FB.group({
      gender:['male'],
      username: ['', [Validators.required, Validators.minLength(3)]],
      knownAs:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      country:['',[Validators.required]],
      city:['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required,this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  //custom validator
  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl)=>{
      return control.value===control.parent?.get(matchTo)?.value ? null : {isMatching:true};
    }
  }
  register() {
    const dob= this.getDateOnly(this.registerForm.get('dateOfBirth')?.value)
    this.registerForm.patchValue({dateOfBirth:dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members')
        this.toastr.success('Registration successful');
      },
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
  private getDateOnly(dob:string | undefined){
    if(!dob) return;
    return new Date().toISOString().slice(0,10);
  }
}
