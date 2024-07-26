import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@mtfs/frontend/auth-service';

@Component({
  selector: 'mtfs-not-found',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ){
    if (authService.userValue)
      console.log(`NotFoundComponent user logged in`);
  }
  click(){
    if(this.authService.userValue){
      console.log(`NotFoundComponent user logged in`);
      this.router.navigate(["/"]);
    }else {
      console.log(`NotFoundComponent user NOT logged in`);
      this.router.navigate(["./login"]);
    }    
  }
}
