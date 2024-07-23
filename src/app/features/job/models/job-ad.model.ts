export interface JobAd {
  id: number,
  title: string,
  description: string,
  skills: string[],
  status: JobAdStatus,
}

export enum JobAdStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived'
}

export interface JobAdDto extends JobAd {
  createdAt: Date,
  updatedAt: Date,
  _embedded: any,
}

export interface JobAdViewModel extends JobAd {
  createdAt: Date;
  updatedAt: Date;
}
