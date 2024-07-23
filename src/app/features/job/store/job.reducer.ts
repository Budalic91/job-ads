import { Action, createReducer, on } from "@ngrx/store";
import { JobAdFilter, JobAdState } from "../models";
import * as JobActions from './job.action';
import { JobAdViewModel } from '../models/job-ad.model';


export const initialState: JobAdState = {
  jobAds: [],
  filteredJobAds: [],
  jobAd: null,
  filter: {} as JobAdFilter,
  error: null,
};

export const jobAdReducer = createReducer(
  initialState,
  on(JobActions.loadJobAds, state => ({...state })),
  on(JobActions.loadJobAdsSuccess, (state, { jobAds }) => ({
    ...state,
    jobAds,
    filteredJobAds: applyFilter(jobAds, state.filter)
  })),
  on(JobActions.loadJobAdsFailure, (state, { error }) => ({...state, error })),

  on(JobActions.loadJobAdById, state => ({...state })),
  on(JobActions.loadJobAdByIdSuccess, (state, { jobAd }) => ({...state, jobAd})),
  on(JobActions.loadJobAdByIdFailure, (state, { error }) => ({...state, error})),

  on(JobActions.createJobAd, state => ({...state })),
  on(JobActions.createJobAddSuccess, (state, { jobAd }) => ({
    ...state,
    jobAds: [...state.jobAds, jobAd],
    filteredJobAds: [...state.jobAds, jobAd],
    filter: {},
  })),
  on(JobActions.createJobAddFailure, (state, { error }) => ({...state, error})),

  on(JobActions.updateJobAd, state => ({...state })),
  on(JobActions.updateJobAdSuccess, (state, { jobAd }) => ({
    ...state,
    loading: false,
    jobAds: state.jobAds.map(ad => ad.id === jobAd.id ? jobAd : ad),
    filteredJobAds: state.jobAds.map(ad => ad.id === jobAd.id ? jobAd : ad),
    filter: {},
  })),
  on(JobActions.updateJobAdFailure, (state, { error }) => ({...state, error})),

  on(JobActions.deleteJobAd, state => ({...state })),
  on(JobActions.deleteJobAdSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    jobAds: state.jobAds.filter(ad => ad.id !== id),
    filteredJobAds: state.jobAds.filter(ad => ad.id !== id),
    filter: {},
  })),
  on(JobActions.deleteJobAdFailure, (state, { error }) => ({...state, error})),

  on(JobActions.selectJobAd, (state, { jobAd }) => ({...state, jobAd})),
  on(JobActions.clearSelectedJobAd, state => ({
    ...state,
    jobAd: null
  })),

  on(JobActions.setJobAdFilter, (state, { filter }) => ({
    ...state,
    filter,
    filteredJobAds: applyFilter(state.jobAds, filter)
  })),
  on(JobActions.clearJobAdFilter, state => ({
    ...state,
    filter: {},
    filteredJobAds: state.jobAds
  })),

);

function applyFilter(jobAds: JobAdViewModel[], filter: JobAdFilter): JobAdViewModel[] {
  return jobAds.filter(jobAd => {
    const matchesTitle = !filter.title || jobAd.title.toLowerCase().includes(filter.title.toLowerCase());
    const matchesDescription = !filter.description || jobAd.description.toLowerCase().includes(filter.description.toLowerCase());
    const matchesSkill = !filter.skill || jobAd.skills.find(item => item.toLowerCase().indexOf(filter?.skill?.toLowerCase() || ''));
    const matchStatus = !filter.status || jobAd.status.toLowerCase().includes(filter.status.toLowerCase());
    return matchesTitle && matchesDescription && matchesSkill && matchStatus;
  })
}

export function reducerFromJobAd(state: JobAdState | undefined, action: Action) {
  return jobAdReducer(state, action);
}
