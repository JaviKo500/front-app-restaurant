import { Producto } from './producto';

export class DetalleCombo {
  id: number;
  producto: Producto;
  cantidad: number = 1;
}
