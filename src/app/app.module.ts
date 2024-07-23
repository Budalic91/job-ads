import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoaderInterceptorProvider } from './core/services';
import { reducers } from './app-reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { InvoiceEffects } from './features/invoice/store';
import { JobEffects } from './features/job/store';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({ keys: ['invoices', 'jobAds'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([InvoiceEffects, JobEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatSnackBarModule,
  ],
  providers: [
    LoaderInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
