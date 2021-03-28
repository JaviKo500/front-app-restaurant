import { MedioPago } from '../pedidos/medio-pago';
import { Pedido } from '../pedidos/pedido';
import { Usuario } from '../persona/usuario.model';

export class Movimiento {
  id: number;
  monto: number = 0.0;
  usuario: Usuario;
  descripcion: string = '';
  pedido: Pedido;
  tipoPago: MedioPago;
  codigoTransaccion: string = '';
}
