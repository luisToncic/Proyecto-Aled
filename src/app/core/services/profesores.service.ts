import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private baseUrl = 'https://67129eea6c5f5ced66242c93.mockapi.io/api/v1';  // URL de MockAPI
  private baseUrlCurso = 'https://67127cf66c5f5ced6623b934.mockapi.io/api/v1';  // URL de MockAPI CURSOS

  constructor(private http: HttpClient) {}

  // Obtener lista de profesores
  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Profesores`);
  }

  // Agregar un nuevo profesor
  addProfesor(profesor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Profesores`, profesor);
  }

  // Actualizar un profesor existente
  updateProfesor(id: string, profesor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Profesores/${id}`, profesor);
  }

  // Eliminar un profesor
  deleteProfesor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Profesores/${id}`);
  }

 // Asignar curso completo al profesor (sin arrays internos)
asignarCursoAProfesor(profesorId: string, cursoId: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrlCurso}/Cursos/${cursoId}`).pipe(
    switchMap((curso: any) => {
      const cursoSimplificado = {
        Id: curso.Id,
        Nombre: curso.Nombre,
        Descripcion: curso.Descripcion
      };

      // Obtener el profesor antes de agregar el curso
      return this.http.get<any>(`${this.baseUrl}/Profesores/${profesorId}`).pipe(
        switchMap((profesor: any) => {
          // Verificar si el curso ya está asignado al profesor
          const cursoExistente = profesor.cursos.find((c: any) => c.Id === cursoId);
          if (!cursoExistente) {
            const nuevosCursos = [...profesor.cursos, cursoSimplificado];  // Solo guardar los datos del curso
            return this.http.put<any>(`${this.baseUrl}/Profesores/${profesorId}`, { ...profesor, cursos: nuevosCursos });
          } else {
            // Si el curso ya está asignado, retornamos el profesor sin cambios
            return this.http.put<any>(`${this.baseUrl}/Profesores/${profesorId}`, profesor);
          }
        })
      );
    })
  );
}

  // Desasignar curso de un profesor
  desasignarCursoDeProfesor(profesorId: string, cursoId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Profesores/${profesorId}`).pipe(
      switchMap((profesor: any) => {
        const nuevosCursos = profesor.cursos.filter((curso: any) => curso.Id !== cursoId);  // Filtrar cursos
        return this.http.put<any>(`${this.baseUrl}/Profesores/${profesorId}`, { ...profesor, cursos: nuevosCursos });
      })
    );
  }
}
