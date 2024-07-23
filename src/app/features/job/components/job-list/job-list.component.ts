import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JobAdViewModel } from '../../models';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent {
  @Input()
  public set jobAds(value: JobAdViewModel[]) {
    this._jobAds = value;
  }

  public get jobAds(): JobAdViewModel[] {
    return this._jobAds;
  }

  @Input()
  public set isMobile(value) {
    this._isMobile = value;
  }

  public get isMobile() {
    return this._isMobile;
  }

  @Output() editJobAdEmitter = new EventEmitter<JobAdViewModel>();
  @Output() deleteJobAdEmitter = new EventEmitter<number>();
  @Output() addNewJobAdEmitter = new EventEmitter<void>();

  private _jobAds: JobAdViewModel[] = [];
  private _isMobile = false;

  displayedColumns: string[] = ['title', 'description', 'skills', 'status', 'actions'];


  public onEditJobAd(item: JobAdViewModel): void {
    this.editJobAdEmitter.emit(item);
  }

  public onDeleteJobAd(id: number): void {
    this.deleteJobAdEmitter.emit(id);
  }

  public onAddNewJobAd(): void {
    this.addNewJobAdEmitter.emit();
  }

  public identify(index: any, item: JobAdViewModel) {
    return item.id;
  }
}
