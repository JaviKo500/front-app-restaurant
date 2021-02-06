import { Mesa } from '../mesa/mesa';
import { Cliente } from '../persona/cliente';
import { DetallePedido } from './detalle-pedido';
import { Estado } from './estado';
import { MedioPago } from './medio-pago';

export class Pedido {
  id: number;
  fecha: Date;
  total: number = 0;
  mesa: Mesa;
  items: DetallePedido[] = [];
  estado: Estado;
  cliente: Cliente;
  medioPago: MedioPago;
}
