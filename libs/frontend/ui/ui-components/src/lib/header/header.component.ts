import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { SideNavService } from '@mtfs/frontend/utils';

@Component({
  selector: 'mtfs-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule  
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private sidenav: SideNavService,
  ){}
  logout(){
    console.log('logout');
  }

  toggleMenu(){
    console.log("toggle")
    this.sidenav.toggle();
  }

  displayProfile(){
    console.log('displayProfile');
  }
}
