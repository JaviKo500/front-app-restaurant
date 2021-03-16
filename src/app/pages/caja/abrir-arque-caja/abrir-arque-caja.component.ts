import { Component, OnInit } from '@angular/core';
import { Arqueo } from 'src/app/models/caja/arqueo';
import { Caja } from 'src/app/models/caja/caja';
import { Usuario } from 'src/app/models/persona/usuario.model';
import { CajaService } from 'src/app/services/caja/caja.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-abrir-arque-caja',
  templateUrl: './abrir-arque-caja.component.html',
  styleUrls: ['./abrir-arque-caja.component.css'],
})
export class AbrirArqueCajaComponent implements OnInit {
  arqueo: Arqueo = new Arqueo();
  cajas: Caja[] = [];
  usuarios: Usuario[] = [];
  constructor(
    private cajaService: CajaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarCajas();
  }
  listarUsuarios(): void {
    this.usuarioService.obtenerUsuariosToArqueo().subscribe((res) => {
      this.usuarios = res;
    });
  }
  listarCajas(): void {
    this.cajaService.obtenerTodasCajas().subscribe((res) => {
      this.cajas = res;
    });
  }

  //comparar-validar datos de Caja en boostrap
  compararCaja(o1: Caja, o2: Caja): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  //comparar-validar datos de usuarios en boostrap
  compararusuario(o1: Usuario, o2: Usuario): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
