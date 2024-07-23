import { ActionReducerMap } from "@ngrx/store";
import { InvoiceState } from "./features/invoice/models";
import { JobAdState } from "./features/job/models";
import { reducerFromJobAd } from "./features/job/store";
import { reducerFromInvoice } from "./features/invoice/store";

export interface AppState {
  jobAds: JobAdState,
  invoices: InvoiceState,
}

export const reducers: ActionReducerMap<AppState> = {
  jobAds: reducerFromJobAd,
  invoices: reducerFromInvoice,
}
