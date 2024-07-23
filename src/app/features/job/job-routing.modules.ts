import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobFormLayoutComponent } from "./components";
import { JobLayoutComponent } from "./components/job-layout/job-layout.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'job-ads',
  },
  {
    path: 'job-ads',
    component: JobLayoutComponent
  },
  {
    path: 'job-form',
    component: JobFormLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
