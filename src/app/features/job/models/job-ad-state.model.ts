import { JobAdFilter } from "./job-ad-filter.model";
import { JobAdViewModel } from "./job-ad.model";

export interface JobAdState {
  jobAds: JobAdViewModel[];
  filteredJobAds: JobAdViewModel[];
  jobAd: JobAdViewModel | null;
  filter: JobAdFilter;
  error: any;
}
