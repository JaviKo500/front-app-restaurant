import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MensajesAlertaService {

  constructor() { }
  // <-------------------------- mensajes para usuario ------------------------->
  mensajeSweetInformacion = (sweetAlertIcon: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string ): void => {
    Swal.fire({ position: 'top-end', icon: sweetAlertIcon, title: mensaje, showConfirmButton: false, timer: 1500});
  }
  // toast ventana de alerta
  mensajeSweetInformacionToast = (sweetAlertIcon: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string ): void => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    Toast.fire({
      icon: sweetAlertIcon,
      title: mensaje
    });
  }
  // tslint:disable-next-line: max-line-length
  mensajeSweetFireToast = (alertIcon: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string, pos: 'top-end', tim = 1500) => {
    Swal.fire({
      position: pos,
      icon: alertIcon,
      title: mensaje,
      showConfirmButton: false,
      timer: tim,
    });
  }
  // <-------------------------- mensajes para usuario ------------------------->
  mensajeSweetFire = (sweetAlertIcon: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string , titulo: string): void => {
    Swal.fire( titulo, mensaje, sweetAlertIcon);
  }
}
