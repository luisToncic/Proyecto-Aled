import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/core/services/cursos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<CursoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cursoForm = this.fb.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required]
    });

    // Si hay datos, es modo edición
    if (data) {
      this.isEditMode = true;
      this.cursoForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  // Guardar los cambios o agregar nuevo curso
  onSave(): void {
    if (this.cursoForm.valid) {
      if (this.isEditMode) {
        this.cursosService.updateCurso(this.data.Id, this.cursoForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar modal al guardar
        });
      } else {
        this.cursosService.addCurso(this.cursoForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar modal al agregar
        });
      }
    }
  }

  // Cancelar el formulario
  onCancel(): void {
    this.dialogRef.close(false);  // Cerrar modal sin guardar
  }
}
