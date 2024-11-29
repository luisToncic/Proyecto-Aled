import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl = 'https://67129eea6c5f5ced66242c93.mockapi.io/api/v1/users'; // URL completa para MockAPI

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Agregar un nuevo usuario
  addUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, usuario);
  }

  // Actualizar un usuario existente
  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
