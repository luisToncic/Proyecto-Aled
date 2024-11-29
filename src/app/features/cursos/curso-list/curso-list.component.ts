import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { ProfesoresService } from 'src/app/core/services/profesores.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: any[] = [];
  cursosFiltrados: any[] = [];
  alumnos: any[] = [];
  profesores: any[] = [];
  userRole: string = '';

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private profesoresService: ProfesoresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cursosService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
      this.cursosFiltrados = [...this.cursos];
    });

    this.alumnosService.getAlumnos().subscribe((data: any[]) => {
      this.alumnos = data;
    });

    this.profesoresService.getProfesores().subscribe((data: any[]) => {
      this.profesores = data;
    });
  }

  filtrarCursos(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.cursosFiltrados = filtro
      ? this.cursos.filter(
          (curso) =>
            curso.Nombre.toLowerCase().includes(filtro) ||
            curso.Descripcion.toLowerCase().includes(filtro)
        )
      : this.cursos;
  }

  openCursoForm(): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Curso agregado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditCursoForm(curso: any): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      width: '500px',
      data: curso
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Curso modificado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  asignarAlumno(cursoId: string, alumnoId: string): void {
    const alumno = this.alumnos.find(a => a.Id === alumnoId);
    this.cursosService.asignarAlumno(cursoId, alumno).subscribe(() => {
      this.alumnosService.asignarCursoAAlumno(alumnoId, cursoId).subscribe(() => {
        this.cargarDatos();
        this.snackBar.open('Alumno asignado correctamente', 'Cerrar', { duration: 3000 });
      });
    });
  }

  asignarProfesor(cursoId: string, profesorId: string): void {
    const profesor = this.profesores.find(p => p.Id === profesorId);
    this.cursosService.asignarProfesor(cursoId, profesor).subscribe(() => {
      this.profesoresService.asignarCursoAProfesor(profesorId, cursoId).subscribe(() => {
        this.cargarDatos();
        this.snackBar.open('Profesor asignado correctamente', 'Cerrar', { duration: 3000 });
      });
    });
  }

  desasignarAlumno(cursoId: string, alumnoId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de que desea desasignar este alumno?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursosService.desasignarAlumno(cursoId, alumnoId).subscribe(() => {
          this.alumnosService.desasignarCursoDeAlumno(alumnoId, cursoId).subscribe(() => {
            this.cargarDatos();
            this.snackBar.open('Alumno desasignado correctamente', 'Cerrar', { duration: 3000 });
          });
        });
      }
    });
  }

  desasignarProfesor(cursoId: string, profesorId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de que desea desasignar este profesor?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursosService.desasignarProfesor(cursoId, profesorId).subscribe(() => {
          this.profesoresService.desasignarCursoDeProfesor(profesorId, cursoId).subscribe(() => {
            this.cargarDatos();
            this.snackBar.open('Profesor desasignado correctamente', 'Cerrar', { duration: 3000 });
          });
        });
      }
    });
  }
  

  deleteCurso(id: string): void {
    const curso = this.cursos.find(c => c.Id === id);
    if (curso.alumnos.length > 0 || curso.profesores.length > 0) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Error',
          message: 'Debe eliminar primero los alumnos o profesores asignados a este curso.'
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Está seguro de que desea eliminar el curso "${curso.Nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursosService.deleteCurso(id).subscribe({
          next: () => {
            this.cargarDatos();
            this.snackBar.open('Curso eliminado correctamente', 'Cerrar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el curso', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}
