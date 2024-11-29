import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
  // Rutas con lazy loading
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/alumnos/alumnos.module').then((m) => m.AlumnosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profesores',
    loadChildren: () =>
      import('./features/profesores/profesores.module').then((m) => m.ProfesoresModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['profesor' , 'admin'] },
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./features/usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
  },

  // Redirección por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
