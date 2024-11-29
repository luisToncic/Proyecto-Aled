import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { Usuario } from 'src/app/core/models/curso.model';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

//HOLA! ;) 

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  displayedColumns: string[] = ['Email', 'Password', 'Role', 'acciones'];

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.usuariosFiltrados = [...this.usuarios];
      },
      error: () => {
        this.snackBar.open('Error al cargar la lista de usuarios', 'Cerrar', { duration: 7000 });
      }
    });
  }

  filtrarUsuarios(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.usuariosFiltrados = filtro
      ? this.usuarios.filter(usuario =>
          usuario.Email.toLowerCase().includes(filtro) || usuario.Role.toLowerCase().includes(filtro)
        )
      : [...this.usuarios];
  }

  openUsuarioForm(): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, { width: '500px', data: null });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Usuario agregado correctamente', 'Cerrar', { duration: 3000 });
        this.getUsuarios();
      }
    });
  }

  openEditUsuarioForm(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, { width: '500px', data: usuario });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Usuario modificado correctamente', 'Cerrar', { duration: 3000 });
        this.getUsuarios();
      }
    });
  }

  deleteUsuario(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Está seguro de que desea eliminar al usuario?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.deleteUsuario(id).subscribe({
          next: () => {
            this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
            this.getUsuarios();
          },
          error: () => {
            this.snackBar.open('Error al eliminar el usuario', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}
