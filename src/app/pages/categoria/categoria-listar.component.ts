import { Component, OnChanges, OnInit } from '@angular/core';

// Para crear modales del ng boostrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from '../../models/productos/categoria.model';


@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

  categoria = new CategoriaModel();
  imagenCategoria: File;
  constructor( private modalService: NgbModal ) { }

  ngOnInit(): void {

  }

  openLg(content) {
    this.modalService.open(content);
  }
  saveCategoria(): void {
    console.log(this.imagenCategoria);
  }

}
