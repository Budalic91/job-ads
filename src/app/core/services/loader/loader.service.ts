import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader = new Subject<boolean>();

  setLoaderStatus(status: boolean) {
    this.loader.next(status);
  }

  getAppLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }
}
