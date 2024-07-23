import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as JobActions from './job.action';
import * as InvoiceActions from '../../invoice/store/invoice.actions'
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { JobAdStatus } from '../models/job-ad.model';
import { UtilsService } from "../../../shared/services/utils.service";
import { Action, select, Store } from "@ngrx/store";
import { InvoiceState } from "../../invoice/models";
import { getInvoices } from "../../invoice/store";
import { JobService } from "../services";

@Injectable()
export class JobEffects {
  constructor(
    private _actions$: Actions,
    private _jobService: JobService,
    private _utilsService: UtilsService,
    private _invoiceStore: Store<InvoiceState>,
  ) {}

  loadJobAds$ = createEffect(() =>
    this._actions$.pipe(
      ofType(JobActions.loadJobAds),
      mergeMap(() =>
        this._jobService.getJobAds()
        .pipe(
          map(jobAds => JobActions.loadJobAdsSuccess({jobAds})),
          catchError(error => of(JobActions.loadJobAdsFailure({ error })))
        )
      )
    )
  );

  loadJobAdById$ = createEffect(() =>
    this._actions$
      .pipe(
        ofType(JobActions.loadJobAdById),
        mergeMap(action =>
          this._jobService.getJobAdById(action.id)
            .pipe(
              map(jobAd => JobActions.loadJobAdByIdSuccess({ jobAd })),
              catchError(error => of(JobActions.loadJobAdByIdFailure({ error }))),
            )
        )
      )
  );

  createJobAd$ = createEffect(() =>
    this._actions$.pipe(
      ofType(JobActions.createJobAd),
      mergeMap(action =>
        this._jobService.createJobAd(action.jobAd)
          .pipe(
            map(jobAd => {
              this._utilsService.openSnackBar('Job advertisment successfully created.', '', 'success')
              return JobActions.createJobAddSuccess({ jobAd })
            }),
            catchError(error => {
              this._utilsService.openSnackBar('Create Job Advertisment Failure .', '', 'error');
              return of(JobActions.createJobAddFailure({ error }))
            })
          )
      )
    )
  );

  updateJobAd$ = createEffect(() =>
    this._actions$.pipe(
      ofType(JobActions.updateJobAd),
      mergeMap(action =>
        this._jobService.updateJobAd(action.jobAd).pipe(
          map(jobAd => {
            this._utilsService.openSnackBar('Job advertisment successfully updated.', '', 'success')
            return  JobActions.updateJobAdSuccess({ jobAd });
          }),
          catchError(error => {
            this._utilsService.openSnackBar('Update Job Advertisment Failure .', '', 'error');
            return of(JobActions.updateJobAdFailure({ error }));
          }),
        )
      )
    )
  );

  deleteJobAd$ = createEffect(() =>
    this._actions$.pipe(
      ofType(JobActions.deleteJobAd),
      withLatestFrom(this._invoiceStore.pipe(select(getInvoices))),
      mergeMap(([action, invoices]) => {
        const { id } = action;
        const invoice = invoices.find(invoice => invoice.jobAdId === id)

        return this._jobService.deleteJobAd(id)
        .pipe(
            mergeMap(() => {
              this._utilsService.openSnackBar('Job advertisment successfully deleted.', '', 'success')
              const actions: Action[] = [JobActions.deleteJobAdSuccess({ id })];
              if (invoice && invoice.id) {
                actions.push(InvoiceActions.deleteInvoice({id: invoice.id}))
              }
              return actions;
            }),
            catchError(error => {
              this._utilsService.openSnackBar('Delete Job Advertisment Failure .', '', 'error');
              return of(JobActions.deleteJobAdFailure({ error }));
            }),
          )
      }
      )
    )
  );

  publishJobAd$ = createEffect(() =>
    this._actions$.pipe(
      ofType(JobActions.updateJobAdSuccess),
      filter(action => action.jobAd.status === JobAdStatus.Published),
      map(action => {
        const invoice = {
          jobAdId: action.jobAd.id,
          amount: 1000,
          dueDate: this._utilsService.calculateDueDate(action.jobAd.createdAt),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return InvoiceActions.createInvoice({ invoice })
      })
    )
  )

}
