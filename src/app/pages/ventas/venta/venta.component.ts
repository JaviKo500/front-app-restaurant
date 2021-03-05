import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mesa } from 'src/app/models/mesa/mesa';
import { Estado } from 'src/app/models/pedidos/estado';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { Cliente } from 'src/app/models/persona/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  mesas: Mesa[] = [];
  cliente: Cliente = new Cliente();
  buscarClienteCedula: string = '';
  ConsumidorFinal: boolean = false;
  mesa: Mesa = new Mesa();
  estados: Estado[] = [];
  pedido: Pedido = new Pedido();
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    //listar los estados del pedido
    this.listarEstadosPedido();
  }
  abrirModalCliente(modal) {
    this.modalReference = this.modalService.open(modal, { size: 'xl' });
  }
  abrirModalMesa(modal) {
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
  ConsumidorFilanEstado() {
    this.buscarClienteCedula = '';
    if (this.ConsumidorFinal == true) {
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
      this.filtrarPlatos();
    }
    if (event === 'combo') {
      this.filtrarCombo();
    }
  }
  filtrarPlatos(): void {
    console.log('filtrado de platos');
  }
  filtrarCombo(): void {
    console.log('filtrado de combos');
  }
}
