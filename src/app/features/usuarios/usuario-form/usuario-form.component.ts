import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { Usuario } from 'src/app/core/models/curso.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent {
  usuarioForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | null
  ) {
    this.isEditMode = !!data;

    this.usuarioForm = this.fb.group({
      Email: [data?.Email || '', [Validators.required, Validators.email]],
      Password: [data?.Password || '', [Validators.required, Validators.minLength(4)]],
      Role: [data?.Role || '', Validators.required],
    });
  }

  saveUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;
  
      if (this.isEditMode && this.data?.Id) {
        // Actualizar usuario existente
        this.usuariosService.updateUsuario(this.data.Id, usuarioData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Agregar un nuevo usuario
        this.usuariosService.addUsuario(usuarioData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
  
}
