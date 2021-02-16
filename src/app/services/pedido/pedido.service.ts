import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/configurations';
import { Observable, throwError } from 'rxjs';
import { DetallePedido } from '../../models/pedidos/detalle-pedido';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  //evento para retornar el detalle pedido
  items$ = new EventEmitter<DetallePedido[]>();

  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  registrarPedido(pedido: Pedido): Observable<any> {
    return this.http
      .post(this.url + 'register/new/pedido', pedido, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'warning');
          return throwError(e);
        })
      );
  }
}
