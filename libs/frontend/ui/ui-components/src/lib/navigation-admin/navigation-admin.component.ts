import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mtfs-navigation-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './navigation-admin.component.html',
  styleUrl: './navigation-admin.component.scss',
})
export class NavigationAdminComponent {}
