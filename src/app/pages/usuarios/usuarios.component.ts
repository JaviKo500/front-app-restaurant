import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/persona/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuario[] = [];
  constructor() {}

  ngOnInit(): void {}
}
