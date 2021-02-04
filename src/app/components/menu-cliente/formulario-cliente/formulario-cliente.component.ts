import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {
  @Output() registrocliente: EventEmitter<boolean> = new EventEmitter();

  @Input() cerrarModalRef: NgbModalRef;
  constructor() { }

  ngOnInit(): void {

  }

  registrarPersona(): void {
    this.registrocliente.emit( true );
  }
  cerrarModal(): void {
    this.cerrarModalRef.close();
  }

}
