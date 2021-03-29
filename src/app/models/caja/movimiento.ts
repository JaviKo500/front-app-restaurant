import { Pedido } from '../pedidos/pedido';
import { Usuario } from '../persona/usuario.model';
import { MedioPago } from './medio-pago';

export class Movimiento {
  id: number;
  monto: number = 0.0;
  usuario: Usuario = null;
  descripcion: string = '';
  pedido: Pedido = null;
  tipoPago: MedioPago;
  fecha: Date;
  fechaMovimiento: Date;
  estado: boolean;
}
