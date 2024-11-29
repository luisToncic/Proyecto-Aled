import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private baseUrl = 'https://67127cf66c5f5ced6623b934.mockapi.io/api/v1';  // URL de MockAPI
  
  constructor(private http: HttpClient) {}

  // Obtener la lista de cursos
  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Cursos`);
  }

  // Agregar un nuevo curso
  addCurso(curso: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Cursos`, curso);
  }

  // Actualizar un curso existente
  updateCurso(id: string, curso: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Cursos/${id}`, curso);
  }

  // Eliminar un curso
  deleteCurso(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Cursos/${id}`);
  }

  // Asignar alumno a un curso (sin su array de cursos)
  asignarAlumno(cursoId: string, alumno: any): Observable<any> {
    const alumnoSimplificado = {
      Id: alumno.Id,
      Nombre: alumno.Nombre,
      Apellido: alumno.Apellido,
      Email: alumno.Email,
      Edad: alumno.Edad
    };
    
    return this.http.get<any>(`${this.baseUrl}/Cursos/${cursoId}`).pipe(
      switchMap((curso: any) => {
        const nuevosAlumnos = [...curso.alumnos, alumnoSimplificado];  // Solo guardar los datos relevantes
        return this.http.put<any>(`${this.baseUrl}/Cursos/${cursoId}`, { ...curso, alumnos: nuevosAlumnos });
      })
    );
  }



  // Desasignar alumno de un curso
  desasignarAlumno(cursoId: string, alumnoId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Cursos/${cursoId}`).pipe(
      switchMap((curso: any) => {
        const nuevosAlumnos = curso.alumnos.filter((alumno: any) => alumno.Id !== alumnoId);  // Filtrar alumnos
        return this.http.put<any>(`${this.baseUrl}/Cursos/${cursoId}`, { ...curso, alumnos: nuevosAlumnos });
      })
    );
  }

  
// Asignar profesor a un curso (sin su array de cursos)
asignarProfesor(cursoId: string, profesor: any): Observable<any> {
  const profesorSimplificado = {
    Id: profesor.Id,
    Nombre: profesor.Nombre,
    Apellido: profesor.Apellido,
    Email: profesor.Email
  };

  return this.http.get<any>(`${this.baseUrl}/Cursos/${cursoId}`).pipe(
    switchMap((curso: any) => {
      const nuevosProfesores = [...curso.profesores, profesorSimplificado];  // Solo guardar los datos relevantes
      return this.http.put<any>(`${this.baseUrl}/Cursos/${cursoId}`, { ...curso, profesores: nuevosProfesores });
    })
  );
}

  // Desasignar profesor de un curso
  desasignarProfesor(cursoId: string, profesorId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Cursos/${cursoId}`).pipe(
      switchMap((curso: any) => {
        const nuevosProfesores = curso.profesores.filter((profesor: any) => profesor.Id !== profesorId);  // Filtrar profesores
        return this.http.put<any>(`${this.baseUrl}/Cursos/${cursoId}`, { ...curso, profesores: nuevosProfesores });
      })
    );
  }
}
