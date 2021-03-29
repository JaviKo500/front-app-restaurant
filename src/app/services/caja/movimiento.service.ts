import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MedioPago } from 'src/app/models/caja/medio-pago';
import { Movimiento } from 'src/app/models/caja/movimiento';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private url: string = BASE_URL;
  constructor(private http: HttpClient) {}
  registrarMovimiento(movimiento: Movimiento): Observable<any> {
    return this.http
      .post(this.url + 'finalizar-pedido/crear-movimiento', movimiento)
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          return throwError(e);
        })
      );
  }
  //obtener lista de medios de pago
  obtenerMediosPago(): Observable<MedioPago[]> {
    return this.http.get<MedioPago[]>(this.url + 'get/medio-pago');
  }
}
