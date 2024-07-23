import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InvoiceService } from "../services";
import * as InvoiceActions from './invoice.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { UtilsService } from "src/app/shared/services/utils.service";

@Injectable()
export class InvoiceEffects {
  constructor(
    private _actions$: Actions,
    private _invoiceService: InvoiceService,
    private _utilsService: UtilsService,
  ) {}

  loadInvoice$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(InvoiceActions.loadInvoices),
        mergeMap(() =>
          this._invoiceService.getInvoices()
            .pipe(
              map(invoices => InvoiceActions.loadInvoicesSuccess({ invoices })),
              catchError(error => of(InvoiceActions.loadInvoicesFailure({ error }))),
            )
        )
      )
  );

  createInvoice$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(InvoiceActions.createInvoice),
        mergeMap(action =>
          this._invoiceService.createInvoice(action.invoice)
            .pipe(
              map(invoice => {
                this._utilsService.openSnackBar('Invoice successfully created.', '', 'success')
                return InvoiceActions.createInvoiceSuccess({ invoice })
              }),
              catchError(error => {
                this._utilsService.openSnackBar('Create Invoice Failure .', '', 'error');
                return of(InvoiceActions.createInvoiceFailure({ error }))
              }),
            )
        )
      )
  );

  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoiceActions.deleteInvoice),
      mergeMap(action =>
        this._invoiceService.deleteInvoice(action.id)
          .pipe(
            map(() => {
              this._utilsService.openSnackBar('Invoice successfully deleted.', '', 'success')
              return InvoiceActions.deleteInvoiceSuccess({ id: action.id});
            }),
            catchError(error => {
              this._utilsService.openSnackBar('Delete Job Advertisment Failure .', '', 'error');
              return of(InvoiceActions.deleteInvoiceFailure({ error }));
            }),
          )
      )
    )
  );

}
