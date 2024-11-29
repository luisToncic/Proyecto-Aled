import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfesoresRoutingModule } from './profesores-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfesorListComponent } from './profesor-list/profesor-list.component';
import { ProfesorFormComponent } from './profesor-form/profesor-form.component';

@NgModule({
  declarations: [ProfesorListComponent, ProfesorFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfesoresRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class ProfesoresModule { }
