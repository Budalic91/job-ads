import { Action, createReducer, on } from "@ngrx/store";
import { InvoiceState } from "../models/invoice-state.model";
import * as InvoiceActions from './invoice.actions';

export const initialState: InvoiceState = {
  invoices: [],
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoices, state => ({ ...state })),
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({...state, invoices})),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({...state, error })),

  on(InvoiceActions.createInvoice, state => ({...state })),
  on(InvoiceActions.createInvoiceSuccess, (state, { invoice }) => ({...state, invoices: [...state.invoices, invoice]})),
  on(InvoiceActions.createInvoiceFailure, (state, { error }) => ({...state, error})),

  on(InvoiceActions.deleteInvoice, state => ({...state })),
  on(InvoiceActions.deleteInvoiceSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    invoices: state.invoices.filter(invoice => invoice.id !== id),
  })),
  on(InvoiceActions.deleteInvoiceFailure, (state, { error }) => ({...state, error})),
);

export function reducerFromInvoice(state: InvoiceState | undefined, action: Action) {
  return invoiceReducer(state, action);
}
