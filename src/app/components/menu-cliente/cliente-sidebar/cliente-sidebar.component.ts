import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { BASE_URL } from 'src/environments/configurations';
import { Categoria } from '../../../models/productos/categoria';

@Component({
  selector: 'app-cliente-sidebar',
  templateUrl: './cliente-sidebar.component.html',
  styleUrls: ['./cliente-sidebar.component.css'],
})
export class ClienteSidebarComponent implements OnInit {
  @Input() categorias: Categoria[] = [];
  api = BASE_URL;
  id_mesa: number;
  constructor(private pedidoService: PedidoService, private router: Router) {}
  ngOnInit(): void {
    //verificar si existe un numero de mesa
    this.pedidoService.id_mesa$.subscribe((id_mesa) => {
      console.log('side bar id mesa: ' + id_mesa);
      if (id_mesa) {
        this.id_mesa = id_mesa;
      }
    });
    if (!this.id_mesa) {
      this.router.navigate(['/cliente/mesas']);
      console.log('no existe id de mesa');
    }
  }

}
