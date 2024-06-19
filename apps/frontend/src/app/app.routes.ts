import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    async loadComponent() {
      const c = await import('@mtfs/frontend/ui-components');
      return c.HomeComponent
    }
  }
];
