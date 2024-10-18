import { Routes } from '@angular/router';
import { LayoutComponent } from './infrastructure/ui';
import { InicioComponent } from './infrastructure/ui/inicio/inicio.component';

export const routes: Routes = [
  {
    component: LayoutComponent,
    path: "",
    title: "Inicio",
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: "inicio",
        component: InicioComponent,
      },
      {
        loadChildren: async () => (await import("@criptomonedas")).routes,
        path: "criptomonedas",
      }
    ],
  },
];
