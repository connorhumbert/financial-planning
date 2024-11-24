import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

import { CompoundInterestComponent } from './app/compound-interest/compound-interest.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'compound-interest', component: CompoundInterestComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(RouterModule),
  ],
});
