import { Usuario } from '../persona/usuario.model';
import { Caja } from './caja';

export class Arqueo {
  id: number;
  caja: Caja;
  usuario: Usuario;
  montoInicial: number = 0.0;
  montoFinal: number = 0.0;
  efectivo: number = 0.0;
  bancos: number = 0.0;
  diferencia: number = 0.0;
  fecha: Date;
  fechaApertura: Date;
  fechaCierre: Date;
  descripcion: string = '';
  descripcionCierre: string = '';
}
