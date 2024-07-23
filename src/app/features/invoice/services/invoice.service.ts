import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { InvoiceDto, InvoiceViewModel } from "../models/invoice.model";
import { Observable, catchError, map } from "rxjs";
import { UtilsService } from "src/app/shared/services/utils.service";
import { InvoiceMapper } from "./invoice.mapper";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = environment.apiUrl;
  private apiUrl = 'invoices'
  private url = `${this.baseUrl}/${this.apiUrl}`;

  constructor(
    private _http: HttpClient,
    private _utilsService: UtilsService,
    private _invoiceMapper: InvoiceMapper,
  ) {}

  public getInvoices(): Observable<InvoiceViewModel[]> {
    return this._http.get<InvoiceDto[]>(this.url)
      .pipe(
        map((invoicesDto: InvoiceDto[]) => invoicesDto.map(this._invoiceMapper.toViewModel)),
        catchError(this._utilsService.handleError)
      )
  }

  public createInvoice(invoice: InvoiceViewModel): Observable<InvoiceViewModel> {
    const invoiceDto: InvoiceDto = this._invoiceMapper.toDto(invoice);
    return this._http.post<InvoiceDto>(this.url, invoiceDto)
      .pipe(
        map(this._invoiceMapper.toViewModel),
        catchError(this._utilsService.handleError)
      )
  }

  public deleteInvoice(id: number) {
    return this._http.delete<void>(`${this.url}/${id}`)
      .pipe(
        catchError(this._utilsService.handleError)
      );
  }
}
