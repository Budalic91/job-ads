import { RouterModule, Routes } from "@angular/router";
import { InvoiceLayoutComponent } from "./components";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InvoiceLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
