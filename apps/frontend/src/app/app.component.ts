import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@mtfs/frontend/ui-components';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  selector: 'nav-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
