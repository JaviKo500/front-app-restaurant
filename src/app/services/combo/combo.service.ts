import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Combo } from 'src/app/models/productos/combo';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ComboService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  registrarCombo(combo: Combo): Observable<any> {
    return this.http
      .post(this.url + 'registrar/combo', combo, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          if (e.status === 409) {
            console.log(e);
          }
          swal.fire(e.error.mensaje, e.error.error, 'warning');
          return throwError(e);
        })
      );
  }

  listarTiposCategorias(): Observable<any> {
    return this.http.get(this.url + 'get/categories/combos').pipe(
      map((response: any) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  listarCombosPageable(page: number): Observable<any> {
    return this.http.get(this.url + 'get/combos-disponibles/' + page).pipe(
      map((response: any) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  obtenerCombosDisponibles(): Observable<any> {
    return this.http.get(this.url + '').pipe(
      map((response: any) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }
}
