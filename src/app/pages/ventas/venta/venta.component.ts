import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Mesa } from 'src/app/models/mesa/mesa';
import { OperacionesCombos } from 'src/app/models/operaciones/operaciones-combos';
import { DetalleComboPedido } from 'src/app/models/pedidos/detalle-combo-pedido';
import { Estado } from 'src/app/models/pedidos/estado';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { Cliente } from 'src/app/models/persona/cliente';
import { Combo } from 'src/app/models/productos/combo';
import { Producto } from 'src/app/models/productos/producto';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ComboService } from 'src/app/services/combo/combo.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  mesas: Mesa[] = [];
  radioIsProducto = true;
  cliente: Cliente = new Cliente();
  buscarClienteCedula = '';
  ConsumidorFinal = false;
  mesa: Mesa = new Mesa();
  estados: Estado[] = [];
  pedido: Pedido = new Pedido();
  modalReference: NgbModalRef;
  NuevoCombo: DetalleComboPedido = new DetalleComboPedido();
  constructor(
    private modalService: NgbModal,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private comboService: ComboService
  ) {}

  ngOnInit(): void {
    // listar los estados del pedido
    this.listarEstadosPedido();
  }
  abrirModalCliente(modal): void {
    this.modalReference = this.modalService.open(modal, { size: 'xl' });
  }
  abrirModalMesa(modal): void {
    this.obtenerMesas();
    this.modalReference = this.modalService.open(modal, { scrollable: true });
  }
  CerrarModal(): void {
    this.modalReference.close();
  }
  obtenerMesas(): void {
    this.mesaService.ObtenerMesas().subscribe((res) => {
      console.log(res);
      this.mesas = res;
    });
  }
  seleccionarMesa(mesa: Mesa): void {
    this.mesa = mesa;
    this.pedido.mesa = this.mesa;
    this.CerrarModal();
  }

  listarEstadosPedido(): void {
    this.pedidoService.listarEstadosPedidos().subscribe((res) => {
      this.estados = res;
      console.log(res);
    });
  }

  compararEstados(o1: Estado, o2: Estado): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  buscarClientePorCedula(event: any): void {
    console.log('evento activado');
    this.clienteService
      .ClienteCedula(this.buscarClienteCedula)
      .subscribe((res) => {
        console.log(res);
        this.cliente = res;
      });
  }
  ConsumidorFilanEstado(): void {
    this.buscarClienteCedula = '';
    if (this.ConsumidorFinal === true) {
      console.log(true);
      this.clienteService.ClienteCedula('9999999999').subscribe((res) => {
        console.log(res);
        this.cliente = res;
      });
    } else {
      this.cliente = new Cliente();
    }
  }
  AsignarCLienteRegistrado(cliente: Cliente): void {
    if (cliente) {
      this.cliente = cliente;
    } else {
      swal.fire('Observación', 'error cliente no obtenido', 'warning');
    }
  }
  SeleccionDeFiltrado(event: string): void {
    if (event === 'plato') {
      this.radioIsProducto = true;
    }
    if (event === 'combo') {
      this.radioIsProducto = false;
    }
  }
  filtrarPlatos(): void {
    console.log('filtrado de platos');
  }
  // ------------------------------- filtrado de productos-----------------------------------//
  searchProductos = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      mergeMap((term) =>
        term ? this.productoService.getProductoByTerm(term) : []
      )
    );
  // para mostrar datos en la lista del input
  formatterProducto = (producto: Producto) =>
    producto.nombre +
    ' -> $' +
    producto.precio +
    ' -> ' +
    producto.categoria.nombre;
  dataP: Producto[] = [];
  // temina el formato

  seleccionarProducto = (producto: Producto) => {
    console.log(producto);
    return '';
  };
  //termina el filtrado de productos

  // ------------------------------- filtrado de combos-----------------------------------//

  searchCombos = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      mergeMap((term) => (term ? this.comboService.getComboByTerm(term) : []))
    );
  // para mostrar datos en la lista del input
  formatterCombo = (combo: Combo) =>
    combo.nombre + ' -> $' + combo.precio + ' -> ' + combo.categoria.nombre;
  dataC: Combo[] = [];
  //temina el formato

  seleccionarCombo = (combo: Combo) => {
    let operacion: OperacionesCombos = new OperacionesCombos();
    this.NuevoCombo.combo = combo;
    console.log(combo);
    let existe = operacion.existeCombo(combo.id, this.pedido.combos);
    console.log(existe);
    if (!existe) {
      this.pedido.combos.push(this.NuevoCombo);
    } else {
      //sumar cantidad
    }
    //restauramos la variable
    this.NuevoCombo = new DetalleComboPedido();
    return '';
  };
}
