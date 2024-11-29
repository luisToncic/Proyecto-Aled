import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesoresService } from 'src/app/core/services/profesores.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profesor-form',
  templateUrl: './profesor-form.component.html',
  styleUrls: ['./profesor-form.component.css']
})
export class ProfesorFormComponent implements OnInit {
  profesorForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    public dialogRef: MatDialogRef<ProfesorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profesorForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Email: ['', [Validators.required, Validators.email]]
    });

    // Si hay datos, es modo edición
    if (data) {
      this.isEditMode = true;
      this.profesorForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  // Guardar los cambios en el formulario
  onSave(): void {
    if (this.profesorForm.valid) {
      if (this.isEditMode) {
        this.profesoresService.updateProfesor(this.data.Id, this.profesorForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar el modal al guardar cambios
        });
      } else {
        this.profesoresService.addProfesor(this.profesorForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar el modal al agregar un nuevo profesor
        });
      }
    }
  }

  // Cancelar el formulario
  onCancel(): void {
    this.dialogRef.close(false);  // Cerrar el modal sin guardar
  }
}
