import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoFormComponent } from '../alumno-form/alumno-form.component';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: any[] = [];
  alumnosFiltrados: any[] = [];
  userRole: string = '';

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.alumnosService.getAlumnos().subscribe((data: any[]) => {
      this.alumnos = data;
      this.alumnosFiltrados = [...this.alumnos];
    });
  }

  filtrarAlumnos(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.alumnosFiltrados = filtro
      ? this.alumnos.filter(
          (alumno) =>
            alumno.Nombre.toLowerCase().includes(filtro) ||
            alumno.Apellido.toLowerCase().includes(filtro)
        )
      : this.alumnos;
  }

  openAlumnoForm(): void {
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Alumno agregado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditAlumnoForm(alumno: any): void {
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      width: '500px',
      data: alumno
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Alumno modificado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  desasignarCurso(alumnoId: string, cursoId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de que desea desasignar este curso?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnosService.desasignarCursoDeAlumno(alumnoId, cursoId).subscribe(() => {
          this.cursosService.desasignarAlumno(cursoId, alumnoId).subscribe(() => {
            this.cargarDatos();
            this.snackBar.open('Curso desasignado correctamente', 'Cerrar', { duration: 3000 });
          });
        });
      }
    });
  }

  deleteAlumno(id: string): void {
    const alumno = this.alumnos.find(a => a.Id === id);
    if (alumno.cursos.length > 0) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Error',
          message: 'Debe eliminar primero los cursos asignados a este alumno.'
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Está seguro de que desea eliminar al alumno "${alumno.Nombre} ${alumno.Apellido}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnosService.deleteAlumno(id).subscribe({
          next: () => {
            this.cargarDatos();
            this.snackBar.open('Alumno eliminado correctamente', 'Cerrar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el alumno', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}
