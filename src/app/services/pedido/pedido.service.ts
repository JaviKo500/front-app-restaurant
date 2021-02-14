import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
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
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;
  // variable para gurdar pedidos desdel servicio
  items: DetallePedido[] = [];
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  // emito evento para pasar los items al componente navbar
  @Output() change: EventEmitter<DetallePedido[]> = new EventEmitter();

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

  // metodo para psar los pedidos
  pasarPedidos(items): void {
    // si exxiste pedidos
    if (items) {
      this.items = items;
      this.change.emit(this.items);
    }
  }
}
