import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://67129eea6c5f5ced66242c93.mockapi.io/api/v1/users'; // MockAPI

  private userRoleSubject = new BehaviorSubject<string>(this.getRole()); // Inicializamos con el valor de localStorage
  userRole$ = this.userRoleSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.Email === credentials.email && u.Password === credentials.password
        );
        if (user) {
          this.saveSession('mock-token', user.Role); // Guardamos la sesión
          return { token: 'mock-token', role: user.Role, id: user.Id };
        } else {
          throw new Error('Credenciales incorrectas.');
        }
      }),
      catchError(() => {
        throw new Error('Error en la autenticación.');
      })
    );
  }

  saveSession(token: string, role: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    this.userRoleSubject.next(role); // Emitimos el nuevo rol
  }

  getRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(''); // Emitimos un valor vacío al cerrar sesión
  }
}
