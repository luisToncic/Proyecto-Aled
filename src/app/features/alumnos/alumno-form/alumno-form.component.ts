import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    public dialogRef: MatDialogRef<AlumnoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alumnoForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Edad: ['', [Validators.required, Validators.min(19), Validators.max(111)]], 
      Email: ['', [Validators.required, Validators.email]]
    });

    // Si hay datos, es modo edición
    if (data) {
      this.isEditMode = true;
      this.alumnoForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.alumnoForm.valid) {
      if (this.isEditMode) {
        this.alumnosService.updateAlumno(this.data.Id, this.alumnoForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar el modal al guardar
        });
      } else {
        this.alumnosService.addAlumno(this.alumnoForm.value).subscribe(() => {
          this.dialogRef.close(true);  // Cerrar el modal al agregar
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Cerrar el modal sin guardar
  }
}
