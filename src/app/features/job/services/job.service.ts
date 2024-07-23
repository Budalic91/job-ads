import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobAdDto, JobAdViewModel } from '../models/job-ad.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { JobAdMapper } from './job-ad-mapper';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = environment.apiUrl;
  private apiUrl = 'jobs';
  private url = `${this.baseUrl}/${this.apiUrl}`;

  constructor(
    private http: HttpClient,
    private _utilsService: UtilsService,
    private _jobAdMapper: JobAdMapper,
  ) { }

  public getJobAds(): Observable<JobAdViewModel[]> {
    return this.http.get<JobAdDto[]>(this.url)
      .pipe(
        map((jobAdsDto) => jobAdsDto.map(this._jobAdMapper.toViewModel)),
        catchError(this._utilsService.handleError)
      )
  }

  public getJobAdById(id: number): Observable<JobAdViewModel> {
    return this.http.get<JobAdDto>(`${this.url}/${id}`)
      .pipe(
        map(this._jobAdMapper.toViewModel),
        catchError(this._utilsService.handleError)
      )
  }

  public createJobAd(jobAd: JobAdViewModel): Observable<JobAdViewModel> {
    const jobAdDto: JobAdDto = this._jobAdMapper.toDto(jobAd);
    return this.http.post<JobAdDto>(this.url, jobAdDto)
      .pipe(
        map(this._jobAdMapper.toViewModel),
        catchError(this._utilsService.handleError)
      );
  }

  public updateJobAd(jobAd: JobAdViewModel): Observable<JobAdViewModel> {
    return this.http.put<JobAdDto>(`${this.url}/${jobAd?.id}`, jobAd)
      .pipe(
        map(this._jobAdMapper.toViewModel),
        catchError(this._utilsService.handleError)
      );
  }

  public deleteJobAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
      .pipe(
        catchError(this._utilsService.handleError)
      );
  }
}
