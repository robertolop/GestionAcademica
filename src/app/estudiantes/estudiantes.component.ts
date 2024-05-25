import { Component, OnInit, inject } from '@angular/core';
import { EstudiantesService } from '../services/estudiantes.service';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {
  // Inyeccion de dependencias
  private readonly estudiantesService = inject(EstudiantesService);
  private readonly router = inject(Router);
  // Arreglo para almacenar el listado de estudiantes
  lstEstudiantes: Estudiante[];

  constructor() {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstEstudiantes = [];
  }

  ngOnInit(): void {
    this.getAllEstudiantes();
  }

  // Obtener lista de estudiantes
  getAllEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (temp: Estudiante[]) => {
        this.lstEstudiantes = temp;
      },
      error: (err: any) => {
        console.log("No se pudo obtener información", err);
      }
    });
  }

  // Método que permite navegar al formulario para insertar estudiantes
  navigateToForm() {
    this.router.navigate(['/agregarEstudiante']);
  }

  // Eliminar un estudiante
  deleteEstudiante(event: any) {
    Swal.fire({
      title: "¿Quiere eliminar este registro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudiantesService.eliminarEstudiante(event.target.value).subscribe({
          next: () => {
            Swal.fire("Eliminado", "Registro eliminado con éxito", "success");
            this.getAllEstudiantes();
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: parsearErroresAPI(err).toString()
            });
          }
        });
      }
    });
  }

  /**
   * Método que permite viajar al componente para agregar un estudiante (pero en modo edición).
   */
  updateEstudiante(valor: number) {
    // Viajando al componente agregar estudiante
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redirección. Ej. /agregarEstudiante/3
      this.router.navigate(['/agregarEstudiante', valor]);
    }
  }
}
