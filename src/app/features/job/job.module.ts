import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  JobFilterComponent,
  JobFormComponent,
  JobFormLayoutComponent,
  JobLayoutComponent,
  JobListComponent,
} from './components';
import { JobRoutingModule } from './job-routing.modules';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JobEffects, jobAdReducer } from './store';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JobListComponent,
    JobFormComponent,
    JobLayoutComponent,
    JobFilterComponent,
    JobFormLayoutComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    StoreModule.forFeature('jobAds', jobAdReducer),
    EffectsModule.forFeature([JobEffects]),
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class JobModule { }
