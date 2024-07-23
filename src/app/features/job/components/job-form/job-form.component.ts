import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { JobAdViewModel } from '../../models';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { JobAdStatus } from '../../models/job-ad.model';
import { emptyArrayValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormComponent implements OnChanges {
  @Input()
  public set jobAd(value: JobAdViewModel | null) {
    if (value) {
      this._jobAd = value;
    }
  }

  public get jobAd(): JobAdViewModel | null {
    return this._jobAd;
  }

  @Input()
  public set isMobile(value: boolean) {
    this._isMobile = value;
  }

  public get isMobile(): boolean {
    return this._isMobile;
  }

  @Input()
  public set submitButtonText(value: string) {
    this._submitButtonText = value;
  }

  public get submitButtonText(): string {
    return this._submitButtonText;
  }

  @Output() cancelFormAction = new EventEmitter<void>();
  @Output() saveFormAction = new EventEmitter<JobAdViewModel>();

  public get JobAdStatus(): typeof JobAdStatus {
    return JobAdStatus;
  }

  get skillsArray(): FormArray {
    return this.jobAdForm.get('skills') as FormArray;
  }

  get jobAdFormControls(): { [key: string]: AbstractControl } {
    return this.jobAdForm.controls;
  }

  private _jobAd: JobAdViewModel | null = null;
  private _isMobile = false;
  private _submitButtonText = 'Save';

  jobAdForm: FormGroup;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('');
  currentStatus!: JobAdStatus;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.jobAdForm = this._fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      skills: this._fb.array([], [Validators.required, emptyArrayValidator()]),
      status: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobAd'] && changes['jobAd']?.currentValue) {
        this.jobAdForm.patchValue({
          title: changes['jobAd']?.currentValue?.title,
          description: changes['jobAd']?.currentValue?.description,
          status: changes['jobAd']?.currentValue?.status,
        });
        changes['jobAd']?.currentValue?.skills.forEach((skill: string) => this.skillsArray.push(this._fb.control(skill)));
        this.currentStatus = changes['jobAd']?.currentValue?.status;
    }
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skillsArray.push(this._fb.control(value));
      this.skillsArray.updateValueAndValidity();
    }
    event.chipInput.clear();
    this.jobAdFormControls['skills'].markAsTouched();
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
    this.skillsArray.updateValueAndValidity();
  }


  public onCancelFormAction() {
    this.cancelFormAction.emit();
  }

  public onSaveFormAction() {
    const currentDate = new Date();
    const jobAd: JobAdViewModel =  {
      ...this.jobAdForm.value,
      id: this._jobAd?.id ? this._jobAd?.id : null,
      createdAt: this._jobAd ? this._jobAd?.createdAt : currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
      status: this._jobAd ? this.jobAdForm.value.status : this.JobAdStatus.Draft
    }
    this.saveFormAction.emit(jobAd);
  }
}
