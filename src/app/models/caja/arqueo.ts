import { Usuario } from '../persona/usuario.model';
import { Caja } from './caja';

export class Arqueo {
  id: number;
  caja: Caja;
  usuario: Usuario;
}
