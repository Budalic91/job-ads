import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, LoaderComponent } from './components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptorProvider } from './services';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

const CORE_COMPONENTS = [HeaderComponent, LoaderComponent];

@NgModule({
  declarations: [
    ...CORE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  exports: [...CORE_COMPONENTS],
  providers: [LoaderInterceptorProvider],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
