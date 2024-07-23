import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { JobLayoutComponent } from './job-layout.component';
import { JobActions } from '../../store';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JobAdViewModel, JobAdState, JobAdFilter, JobAdStatus } from '../../models';
import { InvoiceActions } from '../../../invoice/store';

describe('JobLayoutComponent', () => {
  let component: JobLayoutComponent;
  let fixture: ComponentFixture<JobLayoutComponent>;
  let store: Store<JobAdState>;
  let router: Router;

  beforeEach(async () => {
    const mockUtilsService = {
      isMobile$: of(false),
    };

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
      declarations: [JobLayoutComponent],
      providers: [
        { provide: UtilsService, useValue: mockUtilsService },
        { provide: ActivatedRoute, useValue: { parent: { url: of([{ path: 'jobs' }]) } } }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadJobAds action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(JobActions.loadJobAds());
  });

  it('should dispatch clearJobAdFilter and clearSelectedJobAd and navigate on onAddNewJobAd', () => {
    const spy = spyOn(store, 'dispatch');
    const navigateSpy = spyOn(router, 'navigate');
    component.onAddNewJobAd();
    expect(spy.calls.allArgs()).toEqual([
      [JobActions.clearJobAdFilter()],
      [JobActions.clearSelectedJobAd()],
    ]);
    expect(navigateSpy).toHaveBeenCalledWith(['job-form'], { relativeTo: component['_activatedRouter'].parent });
  });

  it('should dispatch selectJobAd and navigate on onEditJobAd', () => {
    const spy = spyOn(store, 'dispatch');
    const navigateSpy = spyOn(router, 'navigate');
    const jobAd: JobAdViewModel = { id: 1, title: 'Job 1', description: 'Description 1', skills: ['Skill 1'], status: JobAdStatus.Draft, createdAt: new Date(), updatedAt: new Date() };
    component.onEditJobAd(jobAd);
    expect(spy).toHaveBeenCalledWith(JobActions.selectJobAd({ jobAd }));
    expect(navigateSpy).toHaveBeenCalledWith(['job-form'], { relativeTo: component['_activatedRouter'].parent });
  });

  it('should dispatch deleteJobAd and loadInvoices on onDeleteJobAd if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(store, 'dispatch');
    const jobId = 1;
    component.onDeleteJobAd(jobId);
    expect(spy.calls.allArgs()).toEqual([
      [InvoiceActions.loadInvoices()],
      [JobActions.deleteJobAd({ id: jobId })],
    ]);
  });

  it('should not dispatch deleteJobAd if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(store, 'dispatch');
    component.onDeleteJobAd(1);
    expect(spy).not.toHaveBeenCalledWith(JobActions.deleteJobAd({ id: 1 }));
  });

  it('should dispatch setJobAdFilter on applyFilter', () => {
    const spy = spyOn(store, 'dispatch');
    const filter: JobAdFilter = { title: 'wizard' };
    component.applyFilter(filter);
    expect(spy).toHaveBeenCalledWith(JobActions.setJobAdFilter({ filter }));
  });

  it('should dispatch clearJobAdFilter on clearFilters', () => {
    const spy = spyOn(store, 'dispatch');
    component.clearFilters();
    expect(spy).toHaveBeenCalledWith(JobActions.clearJobAdFilter());
  });

  it('should have correct initial observables', () => {
    component.jobAds$.subscribe(jobAds => {
      expect(jobAds).toEqual([]);
    });
    component.selectedJobAd$.subscribe(selectedJobAd => {
      expect(selectedJobAd).toBeNull();
    });
    component.filter$.subscribe(filter => {
      expect(filter).toBeUndefined();
    });
    component.isMobile$.subscribe(isMobile => {
      expect(isMobile).toBeFalse();
    });
  });
});
