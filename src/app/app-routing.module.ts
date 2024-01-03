import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { EntrepotComponent } from './private/entrepot/entrepot.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./private/dashboard/dashboard.module')
      .then( m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
