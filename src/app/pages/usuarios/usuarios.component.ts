import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/persona/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuario [] = [
    {
      id:1,
      cedula: '0105566046',
      email: 'javikosasa@gmail.com',
      nombre: 'Javier Gutierrez',
      telefono: '0987535645',
      username: 'JaViKo'
    },
    {
      id:2,
      cedula: '010012222',
      email: 'javikqqqqq@gmail.com',
      nombre: 'Javiesssr Gutierrez',
      telefono: '0987535645',
      username: 'JaViKosss'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
