import { Routes } from '@angular/router';
import { LayoutComponent } from './infrastructure/ui';

export const routes: Routes = [
  {
    component: LayoutComponent,
    path: '',
    title: 'Inicio',
  },
  {
    loadChildren: async () => (await import("@criptomonedas")).routes,
    path: 'criptomonedas',
  }
];
