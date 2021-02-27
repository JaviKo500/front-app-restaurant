import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Categoria } from '../../../models/productos/categoria';
import { ComboService } from '../../../services/combo/combo.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasCombo: Categoria[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private pedidoService: PedidoService,
    private comboService: ComboService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id_mesa = +params.get('id_mesa');
      if (id_mesa) {
        this.pedidoService.id_mesa$.emit(id_mesa);
      } else {
        this.router.navigate(['/cliente/mesas']);
      }
    });

    this.listarCategorias();
    this.listarCategoriasCombos();
  }

  listarCategorias(): void {
    this.categoriaService. ListaCategoriasProductos()
    .subscribe(categorias => {
      this.categorias = categorias;
    });
  }
  listarCategoriasCombos(): void {
    this.comboService.listarCategoriasCombo()
    .subscribe(categoriasCombo => {
      this.categoriasCombo = categoriasCombo.categorias;
      console.log('data',this.categoriasCombo);
    });
  }
}
