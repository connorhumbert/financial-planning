import { Routes } from '@angular/router';
import { CompoundInterestComponent } from './compound-interest/compound-interest.component';  // Compound interest component
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },  // Default route, loads AppComponent
  { path: 'compound-interest', component: CompoundInterestComponent },  // Compound interest route
];
