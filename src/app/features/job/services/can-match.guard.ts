import { Injectable } from "@angular/core";
import { ActivatedRoute, CanMatch, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { JobAdState } from "../models";
import { Observable } from "rxjs";
import { JobActions } from "../store";

@Injectable({
  providedIn: 'root'
})
export class CanMatchJobForm implements CanMatch {
  constructor(
    private _store: Store<JobAdState>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = this._router.getCurrentNavigation()?.initialUrl.queryParams['id'];
    this._store.dispatch(JobActions.loadJobAdById({ id: id}));
    return true;
  }
}
