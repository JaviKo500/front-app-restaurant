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
  erroresBackend: String[] = [];
  generos: Sexo[] = [];
  roles: Role[] = [];
  role: Role;
  confirmarPassword: string = '';
  coinsidenPassword: boolean = true;
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
        this.buscarUsuarioId(id);
      }
    });
  }

  registrarUsuario(): void {
    if (this.camposCompletos()) {
      //confirmacion de compararContraseñas
      if (this.compararContrasenas()) {
        //eliminar espacios en email, usuario
        this.usuario.email = this.usuario.email.replace(' ', '');
        this.usuario.username = this.usuario.username.replace(' ', '');
        console.log(this.usuario);
        this.usuarioService.registrarUsuario(this.usuario).subscribe(
          (res) => {
            console.log(res);
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.mensaje,
              showConfirmButton: false,
              timer: 1500,
            });
            //resetear variables al guardar
            this.usuario = new Usuario();
            this.role = undefined;
            this.coinsidenPassword = true;
            this.confirmarPassword = '';
            this.erroresBackend = [];
          },
          (err) => {
            if (err.status === 409) {
              this.erroresBackend = err.error.mensaje as string[];
              console.log('mensaje en ts');
              console.log(this.erroresBackend);
            }
          }
        );
      } else {
        this.coinsidenPassword = false;
      }
    } else {
      swal.fire(
        'Observación',
        'Llenar los campos con almenos 3 caracteres.',
        'warning'
      );
    }
  }

  actualizarUsuario(): void {}

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

  buscarUsuarioId(id: number): void {
    this.usuarioService.obtenerUsuarioId(id).subscribe((res) => {
      console.log(res);
      this.usuario = res;
    });
  }

  camposCompletos(): boolean {
    let band;
    let u = this.usuario;
    if (
      u.email.length < 3 ||
      u.nombre.length < 3 ||
      u.password.length < 3 ||
      u.roles == null ||
      u.sexo == null ||
      u.username.length < 3 ||
      this.confirmarPassword.length < 3
    ) {
      band = false;
    } else {
      band = true;
    }
    return band;
  }

  //compararContraseñas
  compararContrasenas(): boolean {
    let band: boolean;
    if (this.usuario.password === this.confirmarPassword) {
      this.coinsidenPassword = true;
      band = true;
    } else {
      this.coinsidenPassword = false;
      band = false;
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
