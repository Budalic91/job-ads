import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InvoiceState } from "../models/invoice-state.model";

const getInvoicesFeatureState = createFeatureSelector<InvoiceState>('invoices');

export const getInvoices = createSelector(
  getInvoicesFeatureState,
  (state: InvoiceState) => state.invoices
);

export const getError = createSelector(
  getInvoicesFeatureState,
  (state: InvoiceState) => state.error
);
