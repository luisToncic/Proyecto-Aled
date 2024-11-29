import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Gestión Académica';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role; // Actualizamos dinámicamente según el rol
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();  // Llamamos al método logout del servicio
    this.router.navigate(['/login']);  // Redirigimos a la página de login
  }

}

