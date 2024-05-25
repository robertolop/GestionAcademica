import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private readonly http = inject(HttpClient);
  
  constructor() { }

  // Obtener lista de estudiantes
  obtenerEstudiantes() {
    return this.http.get<Estudiante[]>(endpoints.ObtenerEstudiantes);
  }

  // Obtener estudiante por ID
  obtenerEstudiantePorID(idEstudiante: number) {
    return this.http.get<Estudiante>(endpoints.ObtenerEstudiantePorID.replace(':idEstudiante', idEstudiante.toString()));
  }

  // Insertar estudiante
  agregarEstudiante(estudiante: Estudiante) {
    let body = {
      "nombresEstudiante": estudiante.nombresEstudiante,
      "apellidosEstudiante": estudiante.apellidosEstudiante,
      "codigoEstudiante": estudiante.codigoEstudiante,
      "correoEstudiante": estudiante.correoEstudiante
    }
    return this.http.post<any>(endpoints.AgregarEstudiante, body);
  }

  // Eliminar un estudiante
  eliminarEstudiante(idEstudiante: number) {
    return this.http.delete<any>(endpoints.eliminarEstudiante.replace(':idEstudiante', idEstudiante.toString()));
  }

  // Actualizar estudiante
  actualizarEstudiante(idEstudiante: number, estudiante: Estudiante) {
    let body = {
      "idEstudiante": estudiante.idEstudiante,
      "nombresEstudiante": estudiante.nombresEstudiante,
      "apellidosEstudiante": estudiante.apellidosEstudiante,
      "codigoEstudiante": estudiante.codigoEstudiante,
      "correoEstudiante": estudiante.correoEstudiante
    }
    return this.http.patch<number>(endpoints.actualizarEstudiante.replace(':idEstudiante', idEstudiante.toString()), body);
  }
}
