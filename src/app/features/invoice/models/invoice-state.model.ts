import { InvoiceViewModel } from "./invoice.model";

export interface InvoiceState {
  invoices: InvoiceViewModel[];
  error: any;
}
