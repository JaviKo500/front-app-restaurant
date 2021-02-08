import { Component, Input, OnInit } from '@angular/core';
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
  constructor() {}
  ngOnInit(): void {}
}
