import { Component, HostListener, OnInit } from '@angular/core';
import { Categoria } from '../../models/productos/categoria';
import { element } from 'protractor';
import { translate } from '@angular/localize/src/utils';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  combos: Combo [] = [];
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private comboService: ComboService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    //obtener el id de la mesa
    this.pedidoService.id_mesa$.subscribe((id_mesa) => {
      if (!id_mesa) {
        this.router.navigate(['/cliente/mesas']);
      } else {
        this.categoriaService.ListaCategorias().subscribe((categorias) => {
          this.categorias = categorias;
        });
        this.comboService.obtenerCombosDisponibles().subscribe( response => {
          // TODO: optimizar
          this.combos = response.combos.content;          
          console.log(this.combos);
        });
      }
    });
  }
}
