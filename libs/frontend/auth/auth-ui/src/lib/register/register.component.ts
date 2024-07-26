import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AuthService } from '@mtfs/frontend/auth-service';
import { ICreateUser } from '@mtfs/shared/domain';

@Component({
  selector: 'mtfs-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit{
  currentForm!: FormGroup;
  loading = false;
  submitted = false;
  numericPattern = '[0-9]*';
  error= '';
  errorMessage='';
  excistedEmail = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  createForm(){
    this.currentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(14), Validators.required, Validators.pattern(this.numericPattern),]],      
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void{    
    this.createForm();
  }

  get emailControl(){
    return this.currentForm.get('email');
  }

  onSubmit(){
    this.submitted= true;
    if(this.currentForm.invalid) {
      console.log ('form invalid');
      return}
    this.loading=true;
    const user: ICreateUser = {
      email: this.currentForm.value.email,
      phoneNumber: "+" + this.currentForm.value.phoneNumber,      
      password: this.currentForm.value.password,
      firstname: this.currentForm.value.firstname,
      lastname: this.currentForm.value.lastname,
    }

    this.authService.register(user)
    .subscribe({
      next: ()=> {
        console.log('Auth.RegisterComponent.onSubmit logged');
        const returnUrl = this.route.snapshot          
          .queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);            
      },
      error: error => {
        console.log('Auth.RegisterComponent.onSubmit not logged');
        this.loading = false;
        if (error.status ===409){
          this.currentForm.controls['email'].setErrors({"conflict": true});
          this.currentForm.invalid;
          this.errorMessage = error.error.message;
        } else if (error.status ===400){    
          this.currentForm.controls['phoneNumber'].setErrors({"invalid-format": true});      
          this.currentForm.invalid;
          console.log(error.error.message);
          this.errorMessage = error.error.message;
        }
        else {
          this.errorMessage = 'Unexpected error occurred';
        }
      }
    });    
  }

  onLoginForm(){
    this.router.navigate(['/auth/login']);
  }  
}
