import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { routes } from "./app.routes";
import { apiErrorInterceptor } from "@ui-lib";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(withInterceptors([
      apiErrorInterceptor
    ])),
    provideAnimationsAsync()
  ]
};
