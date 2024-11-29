import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private baseUrl = 'https://67127cf66c5f5ced6623b934.mockapi.io/api/v1';  // URL de MockAPI

  constructor(private http: HttpClient) {}

  // Obtener lista de alumnos
  getAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Alumnos`);
  }

  // Agregar un nuevo alumno
  addAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Alumnos`, alumno);
  }

  // Actualizar un alumno existente
  updateAlumno(id: string, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Alumnos/${id}`, alumno);
  }

  // Eliminar un alumno
  deleteAlumno(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Alumnos/${id}`);
  }

  // Asignar curso completo al alumno (sin arrays internos)
asignarCursoAAlumno(alumnoId: string, cursoId: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Cursos/${cursoId}`).pipe(
    switchMap((curso: any) => {
      const cursoSimplificado = {
        Id: curso.Id,
        Nombre: curso.Nombre,
        Descripcion: curso.Descripcion
      };

      return this.http.get<any>(`${this.baseUrl}/Alumnos/${alumnoId}`).pipe(
        switchMap((alumno: any) => {
          const nuevosCursos = [...alumno.cursos, cursoSimplificado];  // Solo guardar los datos relevantes
          return this.http.put<any>(`${this.baseUrl}/Alumnos/${alumnoId}`, { ...alumno, cursos: nuevosCursos });
        })
      );
    })
  );
}


  // Desasignar curso de un alumno
  desasignarCursoDeAlumno(alumnoId: string, cursoId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Alumnos/${alumnoId}`).pipe(
      switchMap((alumno: any) => {
        const nuevosCursos = alumno.cursos.filter((curso: any) => curso.Id !== cursoId);  // Filtrar cursos
        return this.http.put<any>(`${this.baseUrl}/Alumnos/${alumnoId}`, { ...alumno, cursos: nuevosCursos });
      })
    );
  }
}
