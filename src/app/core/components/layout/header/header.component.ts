import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  title = 'Advertisment';
  isMobile$: Observable<boolean>;

  constructor(
    private _utilsService: UtilsService,
  ) {
    this.isMobile$ = this._utilsService.isMobile$;
  }
}
