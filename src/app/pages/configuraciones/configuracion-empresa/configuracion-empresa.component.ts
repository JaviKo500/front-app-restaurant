import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

//swal import
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-empresa',
  templateUrl: './configuracion-empresa.component.html',
  styleUrls: ['./configuracion-empresa.component.css'],
})
export class ConfiguracionEmpresaComponent implements OnInit {
  restaurant: Restaurant = new Restaurant();
  vacio: string = 'no registrado';
  numberVacio: number = 0;
  erroresbackend: string[] = [];
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.cargarDataRestaurant();
  }
  cargarDataRestaurant(): void {
    this.restaurantService.obtenerDatosRestaurant().subscribe((res) => {
      this.restaurant = res;
      if (!this.restaurant) {
        this.restaurant = new Restaurant();
        swal.fire(
          'Registro',
          'Debe ingresar los datos para registrar su empresa.',
          'warning'
        );
      }
      console.log(res);
    });
  }

  registrarEmpresa(): void {
    this.restaurantService.actualizarDataRestaurant(this.restaurant).subscribe(
      (res) => {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        this.erroresbackend = err.error.errores as string[];
        console.log(this.erroresbackend);
      }
    );
  }
}
