import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoListComponent } from './alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './alumno-form/alumno-form.component';

const routes: Routes = [
  { path: '', component: AlumnoListComponent },
  { path: 'nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
