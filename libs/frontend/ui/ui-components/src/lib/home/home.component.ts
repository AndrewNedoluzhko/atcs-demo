import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../header/header.component';

import { SideNavService } from '@mtfs/frontend/utils';

@Component({
  selector: 'mtfs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  
  @ViewChild('sidenav', {static:true}) public sidenav!: MatSidenav;
  constructor(
    private sideNavService: SideNavService
  ){}

  ngOnInit(){
    this.sideNavService.sideNaveToggleSubject.subscribe(()=>{
      this.sidenav.toggle();
    })
  } /* */
}
