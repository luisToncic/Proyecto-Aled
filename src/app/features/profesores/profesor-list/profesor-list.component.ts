import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfesorFormComponent } from '../profesor-form/profesor-form.component';
import { ProfesoresService } from 'src/app/core/services/profesores.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent implements OnInit {
  profesores: any[] = [];
  profesoresFiltrados: any[] = [];
  userRole: string = '';

  constructor(
    private profesoresService: ProfesoresService,
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
    this.profesoresService.getProfesores().subscribe((data: any[]) => {
      this.profesores = data;
      this.profesoresFiltrados = [...this.profesores];
    });
  }

  filtrarProfesores(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.profesoresFiltrados = filtro
      ? this.profesores.filter(
          (profesor) =>
            profesor.Nombre.toLowerCase().includes(filtro) ||
            profesor.Apellido.toLowerCase().includes(filtro)
        )
      : this.profesores;
  }

  openProfesorForm(): void {
    const dialogRef = this.dialog.open(ProfesorFormComponent, { width: '500px', data: null });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Profesor agregado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditProfesorForm(profesor: any): void {
    const dialogRef = this.dialog.open(ProfesorFormComponent, { width: '500px', data: profesor });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.snackBar.open('Profesor modificado correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  desasignarCursoProfesor(profesorId: string, cursoId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de que desea desasignar este curso?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profesoresService.desasignarCursoDeProfesor(profesorId, cursoId).subscribe(() => {
          this.cursosService.desasignarProfesor(cursoId, profesorId).subscribe(() => {
            this.cargarDatos();
            this.snackBar.open('Curso desasignado correctamente', 'Cerrar', { duration: 3000 });
          });
        });
      }
    });
  }

  deleteProfesor(id: string): void {
    const profesor = this.profesores.find(p => p.Id === id);
    if (profesor.cursos && profesor.cursos.length > 0) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Error',
          message: 'Debe eliminar primero los cursos asignados a este profesor.'
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Está seguro de que desea eliminar al profesor "${profesor.Nombre} ${profesor.Apellido}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profesoresService.deleteProfesor(id).subscribe({
          next: () => {
            this.cargarDatos();
            this.snackBar.open('Profesor eliminado correctamente', 'Cerrar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el profesor', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}
