import { Mesa } from '../mesa/mesa';
import { Cliente } from '../persona/cliente';
import { DetalleComboPedido } from './detalle-combo-pedido';
import { DetallePedido } from './detalle-pedido';
import { Estado } from './estado';
import { MedioPago } from './medio-pago';

export class Pedido {
  id: number;
  fecha: Date;
  total: number = 0;
  mesa: Mesa;
  items: DetallePedido[] = [];
  combos: DetalleComboPedido[] = [];
  estado: Estado;
  cliente: Cliente;
  medioPago: MedioPago;
}
