import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
// modelos
import { Usuario } from '../../models/persona/usuario.model';
// servicios
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuario[] = [];
  //variable contenedor de los datos de la paginacion de usuarios
  paginador: any;
  path: any = '/dashboard/usuarios/page';
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }
  //paginar lista de usuarios
  listarUsuarios(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.usuarioService.obtenerUsuariosPageable(page).subscribe((res) => {
        this.listaUsuarios = res.content;
        this.paginador = res;
        console.log(res.content);
      });
    });
  }

  //eliminar usuario por id
  eliminarUsuario(id: number): void {
    swal
      .fire({
        title: '¿Esta seguro de eliminar este usuario?',
        text:
          'Sí ud elimina este usuario es posible que pierda recibos y datos importantes relacionadas con este usuario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar de todas formas',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe((res) => {
            this.listarUsuarios();
            swal.fire('Borrado', res, 'success');
            console.log(res);
          });
        }
      });
  }
}
