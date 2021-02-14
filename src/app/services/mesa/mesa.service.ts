import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Mesa } from 'src/app/models/mesa/mesa';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  registrarMesa(mesa: Mesa): Observable<any> {
    return this.http
      .post(this.url + 'register/mesa', mesa, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  actualizarMesa(mesa: Mesa): Observable<any> {
    return this.http
      .put(this.url + 'update/mesa/' + mesa.id, mesa, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  ObtenerMesasPageable(page: number): Observable<any> {
    return this.http.get(this.url + 'get/mesa/' + page).pipe(
      map((response: any) => {
        return response.mesa;
      }),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  ObtenerMesas(): Observable<any> {
    return this.http.get(this.url+'lista/mesa').pipe(
      map((response: any) => {
        return response.lista;
      }),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  deleteMesa(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/mesa/' + id).pipe(
      map((response: any) => response.mensaje),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
