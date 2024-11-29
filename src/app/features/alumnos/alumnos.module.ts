import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialogModule } from '@angular/material/dialog';

import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './alumno-form/alumno-form.component';

@NgModule({
  declarations: [AlumnoListComponent, AlumnoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlumnosRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class AlumnosModule { }
