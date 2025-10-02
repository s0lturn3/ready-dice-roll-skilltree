import { Routes } from '@angular/router';

import { CadastroComponent } from './routes/cadastro/cadastro.component';
import { ConsultaComponent } from './routes/consulta/consulta.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  { path: 'consulta', component: ConsultaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
