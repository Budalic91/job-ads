import { JobAdStatus } from "./job-ad.model";

export interface JobAdFilter {
  title?: string;
  description?: string;
  skill?: string;
  status?: JobAdStatus;
}
