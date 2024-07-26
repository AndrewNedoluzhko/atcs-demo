import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../header/header.component';

import { SideNavService } from '@mtfs/frontend/utils';
import { AuthService } from '@mtfs/frontend/auth-service';
import { NavigationAdminComponent } from '../navigation-admin/navigation-admin.component';
import { NavigationUserComponent } from '../navigation-user/navigation-user.component';

@Component({
  selector: 'mtfs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    HeaderComponent,
    NavigationAdminComponent,
    NavigationUserComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  
  @ViewChild('sidenav', {static:true}) public sidenav!: MatSidenav;
  roleName!: string | undefined;

  constructor(
    private sideNavService: SideNavService,
    private authService: AuthService
  ){
    if (this.authService.userValue){
      console.log('home.component.role?.name')
      console.log(this.authService.userValue.role?.name)
      this.roleName =  this.authService.userValue.role?.name;
    }
  }

  ngOnInit(){
    this.sideNavService.sideNaveToggleSubject.subscribe(()=>{
      this.sidenav.toggle();
    })
  } /* */
}
