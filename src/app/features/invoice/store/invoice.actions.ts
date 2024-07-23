import { createAction, props } from "@ngrx/store";
import { InvoiceViewModel } from "../models/invoice.model";


export const loadInvoices = createAction('[Invoice] Load Invoices');
export const loadInvoicesSuccess = createAction('[Invoice] Load Invoices Success', props<{ invoices: InvoiceViewModel[]}>());
export const loadInvoicesFailure = createAction('[Invoice] Load Invoices Failure', props<{ error: any }>());

export const createInvoice = createAction('[Invoice] Create Invoice', props<{invoice: InvoiceViewModel}>());
export const createInvoiceSuccess = createAction('[Invoice] Create Invoice Success', props<{invoice: InvoiceViewModel}>());
export const createInvoiceFailure = createAction('[Invoice] Create Invoice Failure', props<{ error: any }>());

export const deleteInvoice = createAction('[Invoice] Delete Invoice', props<{ id: number}>());
export const deleteInvoiceSuccess = createAction('[Invoice] Delete Invoice Success', props<{ id: number}>());
export const deleteInvoiceFailure = createAction('[Invoice] Delete Invoice Failure', props<{ error: any}>());
