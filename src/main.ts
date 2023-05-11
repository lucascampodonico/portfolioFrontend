/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'
import { provideAnimations} from '@angular/platform-browser/animations'

import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideStorage(() => getStorage()),
    ),
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes)
  ],

})
.catch(err => console.error(err));