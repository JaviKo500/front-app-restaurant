import { Categoria } from './categoria';
import { DetalleCombo } from './detalle-combo';

export class Combo {
  id: number;
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0.0;
  imagen: string;
  categoria: Categoria;
  itemscombo: DetalleCombo[] = [];
}
