import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/persona/role.model';
import { Sexo } from 'src/app/models/persona/sexo.model';
import { Usuario } from 'src/app/models/persona/usuario.model';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
})
export class FormularioUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  generos: Sexo[] = [];
  roles: Role[] = [];
  role: Role;
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

  registrarUsuario(): void {
    if (this.camposCompletos()) {
      console.log('completos');
      this.usuario.roles.push(this.role);
      console.log(this.role);

      this.usuarioService.registrarUsuario(this.usuario).subscribe((res) => {
        console.log(res);
      });
    } else {
      swal.fire(
        'Observación',
        'Llenar los campos con almenos 3 caracteres.',
        'warning'
      );
    }
  }

  listarRoles(): void {
    this.usuarioService.obtenerusuarioRoles().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  listarSexos(): void {
    this.usuarioService.obtenerUsuarioGeneros().subscribe((res) => {
      console.log(res);
      this.generos = res;
    });
  }

  buscarProductoId(id: number): void {
    console.log(id);
  }

  camposCompletos(): boolean {
    let band;
    let u = this.usuario;
    if (
      u.cedula.length < 10 ||
      u.email.length < 3 ||
      u.nombre.length < 3 ||
      u.password.length < 3 ||
      u.roles == null ||
      u.sexo == null ||
      u.telefono.length < 10 ||
      u.username.length < 3
    ) {
      band = false;
    } else {
      band = true;
    }
    return band;
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
