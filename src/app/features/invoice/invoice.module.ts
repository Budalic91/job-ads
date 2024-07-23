import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceLayoutComponent, InvoiceListComponent } from './components';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './store/invoice.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InvoiceEffects } from './store/invoice.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceLayoutComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    StoreModule.forFeature('invoices', invoiceReducer),
    EffectsModule.forFeature([InvoiceEffects]),
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class InvoiceModule { }
