import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

// Módulo compartido de Angular Material 
//import { MaterialModule } from 'src/app/shared/material.module'; // Si usas un módulo compartido de material

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent  // El componente que muestra la lista de usuarios
  ],
  imports: [
    CommonModule,  // Proporciona funcionalidades comunes como ngIf, ngFor, etc.
    UsuariosRoutingModule,  // Para configurar las rutas de este módulo
    ReactiveFormsModule,  // Necesario para formularios reactivos

    // Angular Material
    MatCardModule,        // Para usar tarjetas
    MatFormFieldModule,   // Para los campos de formulario
    MatInputModule,       // Para los inputs
    MatButtonModule,      // Para los botones
    MatIconModule,        // Para íconos
    MatOptionModule,      // Para opciones en select
    MatDialogModule,      // Para los diálogos 
    MatDividerModule,     // Para divisores
    MatTableModule,       // Para la tabla mat-table
    MatSelectModule,
    MatSnackBarModule
    
    // MaterialModule (si tienes uno personalizado con importaciones comunes de Material)
    //MaterialModule
  ],
})
export class UsuariosModule {}
