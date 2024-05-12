import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private readonly http = inject(HttpClient);

  constructor() { }

  ObtenerEstudiantes() : Observable<any>{
    return this.http.get(endpoints.ObtenerEstudiantes);
  }
}
