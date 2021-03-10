import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';

// enpoint
import { BASE_URL } from 'src/environments/configurations';

// models
import { DetallePedido } from '../../models/pedidos/detalle-pedido';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { DetalleComboPedido } from 'src/app/models/pedidos/detalle-combo-pedido';
import { Estado } from 'src/app/models/pedidos/estado';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  // evento para retornar el detalle pedido
  items$ = new EventEmitter<DetallePedido[]>();
  // evento para pasar el id de la mesa
  id_mesa$ = new EventEmitter<number>();
  // evento para pasar los combos si existen
  itemscombo$ = new EventEmitter<DetalleComboPedido[]>();

  constructor(private http: HttpClient, private router: Router) {}
  private url: string = BASE_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  // listar pedidos del dia
  // el numero 1 es del estado solicitado

  // obtener un pedido por id
  obtenerPedidoPorId(id: number): Observable<any> {
    return this.http.get(this.url + 'get/pedido/auth/' + id).pipe(
      map((response: any) => response.pedido as Pedido),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'warning');
        return throwError(e);
      })
    );
  }

  listarPedidosDia(): Observable<any> {
    return this.http.get(this.url + 'pedidos/dia/estado/' + 1).pipe(
      map((response: any) => response.pedidos as Pedido[]),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'warning');
        return throwError(e);
      })
    );
  }

  listarEstadosPedidos(): Observable<any> {
    return this.http.get(this.url + 'get/pedidos/estados').pipe(
      map((response: any) => response as Estado[]),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'warning');
        return throwError(e);
      })
    );
  }

  // registrar pedido
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
  // registrar pedido
  registrarPedidoAuth(pedido: Pedido): Observable<any> {
    return this.http
      .post(this.url + 'register/new/auth/pedido', pedido, {
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
