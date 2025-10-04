import { Routes } from '@angular/router';

import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  {
    path: 'habilidades',
    loadChildren: () => import('./routes/habilidades/habilidades.routes').then(r => r.HABILIDADES_ROUTES),
    canActivate: [ AuthGuard ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
