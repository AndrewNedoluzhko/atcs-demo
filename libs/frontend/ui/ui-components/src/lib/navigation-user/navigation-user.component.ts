import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'mtfs-navigation-user',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule
  ],
  templateUrl: './navigation-user.component.html',
  styleUrl: './navigation-user.component.scss',
})
export class NavigationUserComponent {}
