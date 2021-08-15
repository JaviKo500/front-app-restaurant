import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPatter: string = '([a-zA-Z]+) ([a-zA-z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public miForm: FormGroup;

  get emailErrorMsg(): string{
    const errors = this.miForm.get('email')?.errors;
    if (errors?.required){
      return 'El email es requerido';
    } else if (errors?.pattern){
      return 'Ingrese un email válido';
    } else if (errors?.emailTomado){
      return 'Email ya registrado';
    }
    return '';
  }
  get contActlErrorMsg(): string{
    const errors = this.miForm.get('contraActual')?.errors;
    if (errors?.required){
      return 'La contaseña es requerida';
    } else if (errors?.minlength){
      return 'Ingrese mínimo 6 caracteres';
    }
    return '';
  }
  get contNueErrorMsg(): string{
    const errors = this.miForm.get('contraNueva')?.errors;
    if (errors?.required){
      return 'La contaseña es requerida';
    } else if (errors?.minlength){
      return 'Ingrese mínimo 6 caracteres';
    }
    return '';
  }
  get contConErrorMsg(): string{
    const errors = this.miForm.get('contraConfirm')?.errors;
    if (errors?.required){
      return 'La contaseña es requerida';
    } else if(errors?.noiguales){
      return 'Las contraseñas deben ser iguales';
    }
    return '';
  }
  constructor() { }

  camposIguales = (campo1: string, campo2: string) => {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if (pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({noiguales: true});
        return {
          noIguales: true
        };
      } else {
        formGroup.get(campo2)?.setErrors(null);
      }
      return null;
    };
  }
  campoEsValido = (campo: string): boolean | null => {
    return  this.miForm.controls?.[campo].invalid
              &&
            this.miForm.controls?.[campo].touched;
  }

}
