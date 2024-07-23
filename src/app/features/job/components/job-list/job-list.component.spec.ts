import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JobListComponent } from './job-list.component';
import { JobAdStatus, JobAdViewModel } from '../../models';
import { ChangeDetectionStrategy } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobListComponent],
      imports: [SharedModule]
    })
    .overrideComponent(JobListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set and get jobAds', () => {
    const jobAds: JobAdViewModel[] = [
      { id: 1, title: 'Job 1', description: 'Description 1', skills: ['Skill 1'], status: JobAdStatus.Draft, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Job 2', description: 'Description 2', skills: ['Skill 2'], status: JobAdStatus.Published, createdAt: new Date(), updatedAt: new Date() },
    ];
    component.jobAds = jobAds;
    expect(component.jobAds).toEqual(jobAds);
  });

  it('should set and get isMobile', () => {
    component.isMobile = true;
    expect(component.isMobile).toBeTrue();
  });

  it('should emit editJobAd event on onEditJobAd call', () => {
    spyOn(component.editJobAdEmitter, 'emit');
    const jobAd: JobAdViewModel = { id: 1, title: 'Job 1', description: 'Description 1', skills: ['Skill 1'], status: JobAdStatus.Draft, createdAt: new Date(), updatedAt: new Date() };
    component.onEditJobAd(jobAd);
    expect(component.editJobAdEmitter.emit).toHaveBeenCalledWith(jobAd);
  });

  it('should emit deleteJobAd event on onDeleteJobAd call', () => {
    spyOn(component.deleteJobAdEmitter, 'emit');
    const jobId = 1;
    component.onDeleteJobAd(jobId);
    expect(component.deleteJobAdEmitter.emit).toHaveBeenCalledWith(jobId);
  });

  it('should emit addNewJobAd event on onAddNewJobAd call', () => {
    spyOn(component.addNewJobAdEmitter, 'emit');
    component.onAddNewJobAd();
    expect(component.addNewJobAdEmitter.emit).toHaveBeenCalled();
  });

  it('should return correct identifier in identify method', () => {
    const jobAd: JobAdViewModel = { id: 1, title: 'Job 1', description: 'Description 1', skills: ['Skill 1'], status: JobAdStatus.Draft, createdAt: new Date(), updatedAt: new Date() };
    expect(component.identify(0, jobAd)).toBe(1);
  });

  it('should display the correct columns in the table', () => {
    const displayedColumns = ['title', 'description', 'skills', 'status', 'actions'];
    expect(component.displayedColumns).toEqual(displayedColumns);
  });

  it('should render jobAd data in the table', () => {
    const jobAds: JobAdViewModel[] = [
      { id: 1, title: 'Job 1', description: 'Description 1', skills: ['Skill 1'], status: JobAdStatus.Draft, createdAt: new Date('2024-01-01'), updatedAt: new Date() },
      { id: 2, title: 'Job 2', description: 'Description 2', skills: ['Skill 2'], status: JobAdStatus.Published, createdAt: new Date('2024-02-01'), updatedAt: new Date() },
    ];
    component.jobAds = jobAds;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);

    const firstRowCells = rows[1].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('Job 1');
    expect(firstRowCells[1].nativeElement.textContent).toContain('Description 1');
    expect(firstRowCells[2].nativeElement.textContent).toContain('Skill 1');
    expect(firstRowCells[3].nativeElement.textContent).toContain(JobAdStatus.Draft);

    const secondRowCells = rows[2].queryAll(By.css('td'));
    expect(secondRowCells[0].nativeElement.textContent).toContain('Job 2');
    expect(secondRowCells[1].nativeElement.textContent).toContain('Description 2');
    expect(secondRowCells[2].nativeElement.textContent).toContain('Skill 2');
    expect(secondRowCells[3].nativeElement.textContent).toContain(JobAdStatus.Published);
  });
});
