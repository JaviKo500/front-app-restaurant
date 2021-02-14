import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../services/mesa/mesa.service';
import { Mesa } from '../../../models/mesa/mesa';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
 mesas: Mesa [] = [];
  constructor( private mesaService: MesaService ) { }

  ngOnInit(): void {
    this.mesaService.ObtenerMesas().subscribe( mesas => {
      this.mesas =mesas
    } );
  }

}
