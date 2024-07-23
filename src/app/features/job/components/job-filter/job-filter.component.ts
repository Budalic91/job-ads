import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobAdFilter, JobAdStatus } from '../../models';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFilterComponent implements OnChanges {
  @Input()
  public set filter(value: JobAdFilter) {
    this._filter = value;
  }

  public get filter(): JobAdFilter {
    return this._filter;
  }

  @Input()
  public set isMobile(value: boolean) {
    this._isMobile = value;
  }

  public get isMobile(): boolean {
    return this._isMobile;
  }

  @Output() clearFiltersAction = new EventEmitter<void>();
  @Output() filterAction = new EventEmitter<JobAdFilter>();

  public get JobAdStatus(): typeof JobAdStatus {
    return JobAdStatus;
  }

  filterForm: FormGroup;
  private _filter: JobAdFilter = {} as JobAdFilter;
  private _isMobile = false;

  constructor(private _fb: FormBuilder) {
    this.filterForm = this._fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      skill: new FormControl(''),
      status: new FormControl(''),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] && changes['filter']?.currentValue ) {
      this.filterForm.patchValue({
        title: changes['filter']?.currentValue.title,
        description: changes['filter']?.currentValue.description,
        skill: changes['filter']?.currentValue.skill,
        status: changes['filter']?.currentValue.status,
      })
    }
  }

  onClearAction(): void {
    this.clearFiltersAction.emit();
    this.filterForm.reset();
  }

  onFilterAction(): void {
    const { title, description, skill, status } = this.filterForm.value;
    this._filter = {
      title: title,
      description : description,
      skill : skill,
      status : status,
    };

    this.filterAction.emit(this._filter)
  }

}
