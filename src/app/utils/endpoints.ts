import { environment } from "../../environments/environment.development";

export const endpoints = {
    AgregarEstudiante : environment.serverURL.concat("api/estudiante/AgregarEstudiante"), 
    actualizarEstudiante : environment.serverURL.concat("api/estudiante/actualizarEstudiante"), 
    eliminarEstudiante : environment.serverURL.concat("api/estudiante/eliminarEstudiante"),
    ObtenerEstudiantePorID : environment.serverURL.concat("api/estudiante/ObtenerEstudiantePorID"),
    ObtenerEstudiantes : environment.serverURL.concat("api/estudiante/ObtenerEstudiantes")
};