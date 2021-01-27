import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/persona/role.model';
import { Sexo } from 'src/app/models/persona/sexo.model';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
})
export class FormularioUsuarioComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listarRoles();
    this.listarSexos();
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      if (id) {
        this.buscarProductoId(id);
      }
    });
  }

  listarRoles(): void {
    this.usuarioService.obtenerusuarioRoles().subscribe((res) => {
      console.log(res);
    });
  }

  listarSexos(): void {
    this.usuarioService.obtenerUsuarioGeneros().subscribe((res) => {
      console.log(res);
    });
  }

  buscarProductoId(id: number): void {
    console.log(id);
  }

  //comparar-validar datos de roles en boostrap
  compararRole(o1: Role, o2: Role): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  //comparar-validar datos de categorias en boostrap
  compararGenero(o1: Sexo, o2: Sexo): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
