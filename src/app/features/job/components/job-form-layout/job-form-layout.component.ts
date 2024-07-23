import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { JobAdState, JobAdViewModel } from '../../models';
import { select, Store } from '@ngrx/store';
import { getJobAd, JobActions } from '../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-job-form-layout',
  templateUrl: './job-form-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormLayoutComponent {
  titleAdd = 'Add New Job Advertisment';
  submitButtonTextAdd = "Create";
  titleUpdate = 'Update Job Advertisment'
  submitButtonTextUpdate = "Update";
  jobAd$: Observable<JobAdViewModel | null>;
  isMobile$: Observable<boolean>;

  constructor(
    private _jobStore: Store<JobAdState>,
    private _route: Router,
    private _activatedRouter: ActivatedRoute,
    private _utilsService: UtilsService,
  ) {
    this.jobAd$ = this._jobStore.pipe(select(getJobAd));
    this.isMobile$ = this._utilsService.isMobile$;
  }

  public onCancelFormAction(): void {
    this._route.navigate(['./'], { relativeTo: this._activatedRouter.parent })
  }

  public onSaveFormAction(jobAd: JobAdViewModel) {
    if (jobAd?.id) {
      this._jobStore.dispatch(JobActions.updateJobAd({ jobAd }));
    } else {
      this._jobStore.dispatch(JobActions.createJobAd({ jobAd }));
    }
    this.onCancelFormAction();
  }

}
