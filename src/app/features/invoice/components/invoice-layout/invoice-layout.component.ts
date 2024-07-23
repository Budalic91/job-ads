import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { InvoiceViewModel } from '../../models/invoice.model';
import { InvoiceState } from '../../models/invoice-state.model';
import { select, Store } from '@ngrx/store';
import { getInvoices, InvoiceActions } from '../../store';
import { JobAdState, JobAdStatus, JobAdViewModel } from '../../../job/models';
import { getJobAds } from '../../../job/store';
import { InvoiceJobViewModel } from '../../models';
import { UtilsService } from '../../../../shared/services'


@Component({
  selector: 'app-invoice-layout',
  templateUrl: './invoice-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceLayoutComponent implements OnInit {
  title = "Invoices";
  invoices$: Observable<InvoiceViewModel[]>;
  jobAds$: Observable<JobAdViewModel[]>;
  combineInvoiceJobData$: Observable<InvoiceJobViewModel[]>;
  isMobile$: Observable<boolean>;

  constructor(
    private storeInvoice: Store<InvoiceState>,
    private jobInvoice: Store<JobAdState>,
    private _utilsService: UtilsService,
  ) {
    this.invoices$ = this.storeInvoice.pipe(select(getInvoices));
    this.jobAds$ = this.jobInvoice.pipe(select(getJobAds));
    this.isMobile$ = this._utilsService.isMobile$;
    this.combineInvoiceJobData$ = combineLatest([this.invoices$, this.jobAds$])
    .pipe(
      map(([invoices, jobAds]: [InvoiceViewModel[], JobAdViewModel[]]) => {
        return jobAds.filter(jobAd => jobAd.status === JobAdStatus.Published).map(jobAd => {
          const findInvoice = invoices.find(invoice => invoice.jobAdId === jobAd.id);
          if (findInvoice) {
            return {
              ...findInvoice,
              jobAdTitle: jobAd.title
            }
          } else {
            this.createMissingInvoice(jobAd);
            return undefined;
          }
        })
        .filter((invoice) => invoice !== undefined) as InvoiceJobViewModel[];

      })
    );
  }

  ngOnInit(): void {
    this.storeInvoice.dispatch(InvoiceActions.loadInvoices());
  }

  // Trigger for creating invoice if exist published jobAd without invoice
    // This should be covered on the BE but for this case we will cover on the FE
  private createMissingInvoice (jobAd: JobAdViewModel) {
    const invoice = {
      jobAdId: jobAd.id,
      amount: 1000,
      dueDate: this._utilsService.calculateDueDate(jobAd.createdAt),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.storeInvoice.dispatch(InvoiceActions.createInvoice({ invoice }))
  }
}
