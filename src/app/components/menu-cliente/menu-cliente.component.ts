import { Component, HostListener, OnInit } from '@angular/core';
import { Categoria } from '../../models/productos/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ComboService } from '../../services/combo/combo.service';
import { Combo } from '../../models/productos/combo';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css'],
})
export class MenuClienteComponent implements OnInit {
  categorias: Categoria[] = [];
  mesa_id: number;
  combos: Combo[] = [];
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    //obtener el id de la mesa
    this.pedidoService.id_mesa$.subscribe((id_mesa) => {
      //this.mesa_id = id_mesa;
      console.log(id_mesa);
      if (!id_mesa) {
        this.router.navigate(['/cliente/mesas']);
      } else {
        this.categoriaService.ListaTodasCategorias().subscribe((categorias) => {
          this.categorias = categorias;
        });
      }
    });
  }
}
