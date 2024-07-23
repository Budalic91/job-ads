import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'job'
  },
  {
    path: 'job',
    loadChildren: () => import('./features/job/job.module').then((m) => m.JobModule),
  },
  {
    path: 'invoice',
    loadChildren: () => import('./features/invoice/invoice.module').then((m) => m.InvoiceModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
