import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Usuario } from '../../models/persona/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuario[] = [];
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }
  //paginhar usuarios
  listarUsuarios(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.usuarioService.obtenerUsuariosPageable(page).subscribe((res) => {
        this.listaUsuarios = res.content;
        console.log(res.content);
      });
    });
  }
}
