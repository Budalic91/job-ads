import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobAdState } from "../models";

const getJobAdsFeatureState = createFeatureSelector<JobAdState>('jobAds');

export const getJobAds = createSelector(
  getJobAdsFeatureState,
  (state: JobAdState) => state.jobAds
);

export const getJobAd = createSelector(
  getJobAdsFeatureState,
  (state: JobAdState) => state.jobAd
);

export const getFilteredJobAds = createSelector(
  getJobAdsFeatureState,
  (state: JobAdState) => state.filteredJobAds
);

export const getFilter = createSelector(
  getJobAdsFeatureState,
 (state: JobAdState) => state.filter
)

export const getError = createSelector(
  getJobAdsFeatureState,
  state => state.error
);
