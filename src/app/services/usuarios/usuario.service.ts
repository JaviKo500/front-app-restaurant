import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Role } from 'src/app/models/persona/role.model';
import { Sexo } from 'src/app/models/persona/sexo.model';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

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
}
