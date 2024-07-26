import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  FormsModule
  } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@mtfs/frontend/auth-service';
import {  ILogin } from '@mtfs/shared/domain';
import { first } from 'rxjs';

@Component({
  selector: 'mtfs-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  login!: ILogin;
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,    
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    
  ){
    //redirect to home page if user already logged in
    if (this.authService.userValue){
      this.router.navigate(['/']);
    }
  }
  createForm(){
    this.loginForm = this.formBuilder.group({      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.createForm();
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid) return;

    this.login = this.loginForm.value
    console.log('Auth.LoginComponent.onSubmit login');
    console.log(this.login);
    this.error = '';
    this.loading = true;    
    this.authService.login(this.login)
      .pipe(first())
      .subscribe({
        next: ()=> { 
          console.log('Auth.LoginComponent.onSubmit logged');
          const returnUrl = this.route.snapshot
            .queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl); 
        },
        error: (error) => {      
          console.log('Auth.LoginComponent.onSubmit not logged');    
          this.error=error;
          this.errorMessage= error.error.message;
            if(error.status ===404){
              this.loginForm.controls['email'].setErrors({"notFound":true});         
              
            }else if(error.status ===401){
              this.loginForm.controls['password'].setErrors({"unauthorized":true});
            } else {
              this.loginForm.setErrors({"other": true});
              this.errorMessage='Something went wrong! Please try again later.'
            }            
          this.loading = false;
        }}
      )
  }
  onRegisterFrom(){
    this.router.navigate(['/auth/register']);
  }
}
