import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import { CapitalizeFirstPipe, DateFormattPipe } from './pipes';



const SHARED_COMPONENTS = [
  CapitalizeFirstPipe,
  DateFormattPipe,
];
const SHARED_MATERIAL_MODULES = [
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  LayoutModule,
  MatDialogModule,
];
@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...SHARED_MATERIAL_MODULES
  ],
  exports: [...SHARED_MATERIAL_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule { }
