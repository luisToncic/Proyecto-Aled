export interface Curso {
    Id: string;
    Nombre: string;
    Descripcion: string;
    alumnos: Alumno[];       // Relación con alumnos
    profesores: Profesor[];  // Relación con profesores
  }
  
  export interface Alumno {
    Id: string;
    Nombre: string;
    Apellido: string;
    Edad: number;
    Email: string;
    cursos: Curso[];  // Relación con cursos
  }
  
  export interface Profesor {
    Id: string;
    Nombre: string;
    Apellido: string;
    Email: string;
    cursos: Curso[];  // Relación con cursos
  }

  export interface Usuario {
    Id: string;
    Email: string;
    Password: string;
    Role: string;
  }