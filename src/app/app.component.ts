import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from './shared/services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'job-ads';
  isMobile$: Observable<boolean>;

  constructor(
    private _utilsService: UtilsService,
  ) {
    this.isMobile$ = this._utilsService.isMobile$;
  }
}
