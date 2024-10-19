import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    loadComponent: async () =>
      (await import("./infrastructure/paginas")).MateniminetoComponent,
    path: "mantenimiento",
    pathMatch: "full",
  },
  {
    loadComponent: async () =>
      (await import("./infrastructure/paginas")).ListaComponent,
    path: "lista",
    pathMatch: "full",
  },
  {
    path: ":id",
    loadComponent: async () =>
      (await import("./infrastructure/paginas")).EditarComponent,
  },
];
