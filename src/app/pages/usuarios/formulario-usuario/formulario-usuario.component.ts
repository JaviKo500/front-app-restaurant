import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
