import { Routes } from '@angular/router';

import { WelcomeComponent } from './pages';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    title: 'Welcome Kwa Mathe | Best local food',
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
];
