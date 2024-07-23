import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  private _isMobile$ = new BehaviorSubject(false)

  public get isMobile$(): Observable<boolean> {
    return this._isMobile$.asObservable()
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _breakpointObserver: BreakpointObserver,
  ) {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this._isMobile$.next(result.matches);
    });
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happend');
  }

  public calculateDueDate(publishedDate: Date): Date {
    const date = new Date(publishedDate);
    date.setMonth(date.getMonth() + 2);
    return new Date(date.getFullYear(), date.getMonth()+1, 0);
  }

  public openSnackBar(message: string, action: string, type: 'success' | 'error') {
    let className = '';
    if (type === 'success') {
      className = 'success-snackbar';
    } else if (type === 'error') {
      className = 'error-snackbar';
    }

    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: className
    });
  }
}
