import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/persona/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  //**************paginacion*********** */
  paginador: any;
  path: any = '/dashboard/cliente/page';
  //******************termina paginacion************ */
  clientes: Cliente[] = [];
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.listarClientesPaginado(page).subscribe((res) => {
        this.paginador = res.clientes;
        this.clientes = res.clientes.content;
        console.log(this.clientes);
      });
    });
  }
}
