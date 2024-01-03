import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EntrepotComponent } from '../entrepot/entrepot.component';
import { EntrepotNewComponent } from '../entrepot-new/entrepot-new.component';


const routes: Routes = [

  {
    path: '',
    component:DashboardComponent,
    children:[
        {
            path: 'entrepot',
            component:EntrepotComponent
          },
          {
            path: 'entrepot-new',
            component:EntrepotNewComponent
          },
          {
            path: '',
            redirectTo: 'entrepot',
            pathMatch: 'full'
          }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
