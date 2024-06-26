import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mtfs-server-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
})
export class ServerErrorComponent {}
