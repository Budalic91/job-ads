import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { JobAdFilter, JobAdState, JobAdViewModel } from '../../models';
import { JobActions, getFilter, getFilteredJobAds, getJobAd } from '../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceState } from '../../../invoice/models';
import { InvoiceActions } from '../../../invoice/store';
import { UtilsService } from '../../../../shared/services';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components';


@Component({
  selector: 'app-job-layout',
  templateUrl: './job-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobLayoutComponent implements OnInit{
  title = 'Job Advertisments';
  jobAds$: Observable<JobAdViewModel[]>;
  selectedJobAd$: Observable<JobAdViewModel | null>;
  isMobile$: Observable<boolean>;
  filter$: Observable<JobAdFilter>;

  constructor(
    private _jobStore: Store<JobAdState>,
    private _invoiceStore: Store<InvoiceState>,
    private _route: Router,
    private _activatedRouter: ActivatedRoute,
    private _utilsService: UtilsService,
    private _dialog: MatDialog,
  ) {
    this.jobAds$ = this._jobStore.pipe(select(getFilteredJobAds));
    this.selectedJobAd$ = this._jobStore.pipe(select(getJobAd));
    this.filter$ = this._jobStore.pipe(select(getFilter));
    this.isMobile$ = this._utilsService.isMobile$;
  }

  ngOnInit(): void {
    this._jobStore.dispatch(JobActions.loadJobAds());
  }

  public onAddNewJobAd(): void {
    this._jobStore.dispatch(JobActions.clearJobAdFilter());
    this._jobStore.dispatch(JobActions.clearSelectedJobAd());
    this._route.navigate(['job-form'], { relativeTo: this._activatedRouter.parent });
  }

  public onEditJobAd(jobAd: JobAdViewModel): void {
    this._jobStore.dispatch(JobActions.selectJobAd({ jobAd }));
    this._route.navigate(['job-form'], { relativeTo: this._activatedRouter.parent });
  }

  public onDeleteJobAd(id: number): void {
    if (id) {
      const dialogRef = this._dialog.open(DialogComponent, {
        data: {
          title: 'Alert',
          content: 'Are you sure want to delete jobAd?',
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._invoiceStore.dispatch(InvoiceActions.loadInvoices());
          this._jobStore.dispatch(JobActions.deleteJobAd({id}));
        }
      })
    }
  }

  public applyFilter(filter:JobAdFilter): void {
    this._jobStore.dispatch(JobActions.setJobAdFilter({ filter: filter }));
  }

  public clearFilters(): void {
    this._jobStore.dispatch(JobActions.clearJobAdFilter());
  }
}
