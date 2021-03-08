import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Mesa } from 'src/app/models/mesa/mesa';
import { OperacionesCombos } from 'src/app/models/operaciones/operaciones-combos';
import { OperacionesProductos } from 'src/app/models/operaciones/operaciones-productos';
import { DetalleComboPedido } from 'src/app/models/pedidos/detalle-combo-pedido';
import { DetallePedido } from 'src/app/models/pedidos/detalle-pedido';
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
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  //api carga de imagenes
  api = BASE_URL;
  mesas: Mesa[] = [];
  radioIsProducto = true;
  cliente: Cliente = new Cliente();
  buscarClienteCedula = '';
  ConsumidorFinal = false;
  mesa: Mesa = new Mesa();
  estados: Estado[] = [];
  pedido: Pedido = new Pedido();
  comboDetalle: Combo;
  modalReference: NgbModalRef;

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

  registrarPedido(): void {
    //asignar los valores al pedido
    this.pedido.cliente = this.cliente;
    this.pedido.mesa = this.mesa;
    this.pedido.fecha = new Date();
    if (this.validarCampos()) {
      this.pedidoService.registrarPedidoAuth(this.pedido).subscribe((res) => {
        console.log(res);
        //restablecer valores
        this.pedido = new Pedido();
        this.cliente = new Cliente();
        this.mesa = new Mesa();
      });
    }
  }

  obtenerMesas(): void {
    this.mesaService.ObtenerMesas().subscribe((res) => {
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
    if (this.buscarClienteCedula) {
      this.clienteService
        .ClienteCedula(this.buscarClienteCedula)
        .subscribe((res) => {
          this.cliente = res;
          console.log(res);
        });
    }
  }
  ConsumidorFilanEstado(): void {
    this.buscarClienteCedula = '';
    if (this.ConsumidorFinal === true) {
      this.clienteService.ClienteCedula('9999999999').subscribe((res) => {
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

  seleccionarProducto = (prod: Producto) => {
    let operaciones: OperacionesProductos = new OperacionesProductos();
    let NuevoProducto: DetallePedido = new DetallePedido();
    // asignar el producto
    NuevoProducto.producto = prod;
    let existe = operaciones.existeProducto(prod.id, this.pedido.items);
    if (!existe) {
      this.pedido.items.push(NuevoProducto);
    } else {
      // incrementar la cantidad del producto en 1
      this.pedido.items = operaciones.incrementarCantidad(
        prod.id,
        1,
        this.pedido.items
      );
    }
    return '';
  };
  // termina el filtrado de productos
  // eliminar productos de pedido
  eliminarProdPedido(id: number): void {
    let operacion: OperacionesProductos = new OperacionesProductos();
    this.pedido.items = operacion.eliminarProducto(id, this.pedido.items);
  }
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
  // temina el formato
  // funcion para agregar un combo al pedido
  seleccionarCombo = (combo: Combo) => {
    let operacion: OperacionesCombos = new OperacionesCombos();
    let NuevoCombo: DetalleComboPedido = new DetalleComboPedido();
    NuevoCombo.combo = combo;
    let existe = operacion.existeCombo(combo.id, this.pedido.combos);
    if (!existe) {
      this.pedido.combos.push(NuevoCombo);
    } else {
      // incrementar la cantidad del combo en 1
      this.pedido.combos = operacion.incrementarCantidad(
        combo.id,
        1,
        this.pedido.combos
      );
      // sumar cantidad
    }
    // restauramos la variable
    return '';
  };
  // eliminar combos del pedido
  eliminarComboPedido(id: number): void {
    let operacion: OperacionesCombos = new OperacionesCombos();
    this.pedido.combos = operacion.eliminarCombo(id, this.pedido.combos);
  }

  // --------------funciones d elos modaless-----------------
  abrirModalCliente(modal): void {
    this.modalReference = this.modalService.open(modal, { size: 'xl' });
  }
  abrirModalMesa(modal): void {
    this.obtenerMesas();
    this.modalReference = this.modalService.open(modal, { scrollable: true });
  }
  abrirModalDetalle(modal, detallePedidoCombo: DetalleComboPedido): void {
    this.comboDetalle = detallePedidoCombo.combo;
    this.modalReference = this.modalService.open(modal, { scrollable: true });
  }
  CerrarModal(): void {
    this.modalReference.close();
  }

  private pedidoConProductos(): boolean {
    let band = true;
    if (this.pedido.items.length == 0 && this.pedido.combos.length == 0) {
      band = false;
    }
    return band;
  }
  //validar opciones para registrar el pedido
  validarCampos(): boolean {
    let band = true;
    if (this.pedidoConProductos()) {
      let p = this.pedido;
      if (!p.cliente || !p.mesa || !p.estado) {
        swal.fire(
          'Observación',
          'Asegurese de seleccionar un cliente, mesa y estado del pedido',
          'warning'
        );
        band = false;
      }
    } else {
      swal.fire(
        'Observación',
        'Escoger productos y/o combos para el pedido.',
        'warning'
      );
      band = false;
    }
    return band;
  }
}
