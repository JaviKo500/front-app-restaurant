import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Role } from 'src/app/models/persona/role.model';
import { Sexo } from 'src/app/models/persona/sexo.model';
import { Usuario } from 'src/app/models/persona/usuario.model';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //paginar lista de usuarios
  obtenerUsuariosPageable(page: number): Observable<any> {
    return this.http.get(this.url + 'get/users/' + page).pipe(
      map((response: any) => {
        return response.usuarios;
      }),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //bucar usuario por id
  obtenerUsuarioId(id: number): Observable<any> {
    return this.http.get(this.url + 'get/user/' + id).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //listar roles de usuario
  obtenerusuarioRoles(): Observable<Role[]> {
    return this.http.get(this.url + 'get/user/roles').pipe(
      map((response: any) => response.roles as Role[]),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  obtenerUsuarioGeneros(): Observable<Sexo[]> {
    return this.http.get(this.url + 'get/user/sexos').pipe(
      map((response: any) => response.sexos as Sexo[]),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http
      .post(this.url + 'register/user', usuario, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          if (e.status === 409) {
            return throwError(e);
          } else {
            swal.fire(e.error.mensaje, e.error.error, 'error');
          }
          return throwError(e);
        })
      );
  }
}
