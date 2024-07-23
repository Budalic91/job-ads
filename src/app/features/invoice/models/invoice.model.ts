export interface Invoice {
  id?: number;
  jobAdId: number;
  amount: number;
  dueDate: Date;
}

export interface InvoiceDto extends Invoice {
  createdAt: Date;
  updatedAt: Date;
  _embedded: any;
}

export interface InvoiceViewModel extends Invoice {
  createdAt: Date,
  updatedAt: Date,
}
