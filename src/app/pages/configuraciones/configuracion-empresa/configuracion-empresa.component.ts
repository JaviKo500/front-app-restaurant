import { Component, OnInit } from '@angular/core';

// models
import { Restaurant } from 'src/app/models/restaurant/restaurant';

// services
import { MensajesAlertaService } from '../../../services/mensajes-alerta.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-configuracion-empresa',
  templateUrl: './configuracion-empresa.component.html',
  styleUrls: ['./configuracion-empresa.component.css'],
})
export class ConfiguracionEmpresaComponent implements OnInit {
  restaurant: Restaurant = new Restaurant();
  vacio = 'no registrado';
  numberVacio = 0;
  erroresBackend: string [] = [];

  public isEditar = false;
  constructor(
              private mensajeService: MensajesAlertaService,
              private restaurantService: RestaurantService
              ) {}

  ngOnInit(): void {
    this.cargarDataRestaurant();
  }
  cargarDataRestaurant(): void {
    this.restaurantService.obtenerDatosRestaurant().subscribe((res) => {
      this.restaurant = res;
      if (!this.restaurant) {
        this.restaurant = new Restaurant();
        this.mensajeService.mensajeSweetFire('warning', 'Ingrese los datos para registrar su empresa.' , 'Registro')
        this.isEditar = true;
      } else {
        this.isEditar = false;
      }
    });
  }

  registrarEmpresa(): void {
    this.restaurantService.actualizarDataRestaurant(this.restaurant).subscribe(
      (res) => {
        this.mensajeService.mensajeSweetFireToast('success', 'Datos de la empresa guardados', 'top-end');
        this.isEditar = false;
        this.erroresBackend = [];
      },
      (err) => {
        this.erroresBackend = err.error.errores as string[];
        this.isEditar = true;
      }
    );
  }

  //  regresamos a la url anterior
  regresar = () => history.back();

  // para ocultar y mostrar los datos y form
  editar = () => {
    if ( this.restaurant.id  || this.restaurant.nombreRestaurante) {
      this.isEditar = !this.isEditar;
    }
  }
  
}
