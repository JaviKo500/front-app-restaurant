import { Categoria } from './categoria';
export class Producto {
  id: number;
  nombre: string = '';
  precio: number = 0.0;
  descripcion: string = '';
  categoria: Categoria = undefined;
}
