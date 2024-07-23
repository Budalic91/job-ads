import { Component } from '@angular/core';
import { LoaderService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading$: Observable<boolean>;
  loading = true;

  constructor(private _loaderService: LoaderService) {
    this.loading$ = this._loaderService.getAppLoader()
  }
}
