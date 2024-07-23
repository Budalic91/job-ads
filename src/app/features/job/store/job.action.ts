import { createAction, props } from "@ngrx/store";
import { JobAdViewModel } from "../models/job-ad.model";
import { JobAdFilter } from "../models";

export const loadJobAds = createAction('[JobAd] Load Job Ads');
export const loadJobAdsSuccess = createAction('[JobAds] Load Job Ads Success', props<{ jobAds: JobAdViewModel[]}>());
export const loadJobAdsFailure = createAction('[JobAds] Load Job Ads Failure', props<{ error: any}>());

export const loadJobAdById = createAction('[JobAd] Load Job Ad by Id', props<{ id: number }>());
export const loadJobAdByIdSuccess = createAction('[JobAd] Load Job Ad By Id Success', props<{jobAd: JobAdViewModel}>());
export const loadJobAdByIdFailure = createAction('[JobAd] Load Job Ad By Id Failure', props<{ error: any }>());

export const createJobAd = createAction('[JobAd] Create Job Ad', props<{ jobAd: JobAdViewModel}>());
export const createJobAddSuccess = createAction('[JobAd] Create Job Ad Success', props<{jobAd: JobAdViewModel}>());
export const createJobAddFailure = createAction('[JobAd] Create Job Ad Failure', props<{error: any}>());

export const updateJobAd = createAction('[JobAd] Update JobAd', props<{ jobAd: JobAdViewModel}>());
export const updateJobAdSuccess = createAction('[JobAd] Update Job Ad', props<{ jobAd: JobAdViewModel}>());
export const updateJobAdFailure = createAction('[JobAd] Update Job Ad Failure', props<{ error: any}>());

export const deleteJobAd = createAction('[JobAd] Delete JobAd', props<{ id: number}>());
export const deleteJobAdSuccess = createAction('[JobAd] Delete Job Ad Success', props<{ id: number}>());
export const deleteJobAdFailure = createAction('[JobAd] Delete Job Ad Failure', props<{ error: any}>());

export const selectJobAd = createAction('[JobAd] Select Job Ad', props<{ jobAd: JobAdViewModel}>());
export const clearSelectedJobAd = createAction('[JobAd] Clear Selected Job Ad');

export const setJobAdFilter = createAction('[JobAd] Set Job Ad Filter', props<{ filter: JobAdFilter }>());
export const clearJobAdFilter = createAction('[JobAd Clear Job Ad Filter]');
