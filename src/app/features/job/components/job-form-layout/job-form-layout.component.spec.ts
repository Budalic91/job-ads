import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFormLayoutComponent } from './job-form-layout.component';

describe('JobFormLayoutComponent', () => {
  let component: JobFormLayoutComponent;
  let fixture: ComponentFixture<JobFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFormLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
