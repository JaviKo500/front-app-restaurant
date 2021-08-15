import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ValidatorService } from '../../../services/usuarios/validator.service';
import { PasswordRecovery } from '../../../models/persona/password-recovery.model';
import { UsuarioPerfilService } from '../../../services/usuarios/usuario-perfil.service';
import { MensajesAlertaService } from '../../../services/mensajes-alerta.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public emailMSgError: string = '';
  public msgErrorContraAct: string = '';
  public msgErrorContraNue: string = '';
  public msgErrorContraCon: string = '';

  public modalReference: NgbModalRef;

  public miForm: FormGroup = this._fb.group({
    email:          [ , [Validators.required, Validators.pattern(this._vsService.emailPattern)]],
    contraActual:   [ , [Validators.required, Validators.minLength(6)], ],
    contraNueva:    [ , [Validators.required, Validators.minLength(6)]],
    contraConfirm:  [ , [Validators.required]],
  }, {
    validators: [this._vsService.camposIguales('contraNueva', 'contraConfirm')]
  });
  constructor(
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _vsService: ValidatorService,
    private _perfilService: UsuarioPerfilService,
    private _mensajesService: MensajesAlertaService
  ) {
    this._vsService.miForm = this.miForm;
  }

  ngOnInit(): void {
  }

  editEmail = () => {
    if(this.miForm.get('email').valid){
      console.log('error');
    } else {
      this.miForm.get('email').markAsTouched();
    }
  }
  editPassword = () => {
    if(this.miForm.get('contraActual').valid && this.miForm.get('contraNueva').valid && this.miForm.get('contraConfirm').valid){
      let recovery = new PasswordRecovery();
      const { contraActual, contraNueva} = this.miForm.value;
      recovery.newPassword = contraNueva;
      recovery.oldPassword = contraActual;
      this._perfilService.recoveryPassword(recovery)
                          .subscribe( res => {
                            console.log(res);
                            this._mensajesService.mensajeSweetFireToast('success', 'sasa', 'top-end');
                          }, error => {
                            console.log(error);
                            this._mensajesService.mensajeSweetInformacion('warning', error.error.error, 'center');
                          });
    } else {
      this.miForm.get('contraActual').markAsTouched();
      this.miForm.get('contraNueva').markAsTouched();
      this.miForm.get('contraConfirm').markAsTouched();
    }
  }

  tieneError = (campo: string): boolean  => {
    this.emailMSgError     = this._vsService.emailErrorMsg;
    this.msgErrorContraAct = this._vsService.contActlErrorMsg;
    this.msgErrorContraNue = this._vsService.contNueErrorMsg;
    this.msgErrorContraCon = this._vsService.contConErrorMsg;
    return this._vsService.campoEsValido(campo);
  }

  abrirModalEmail = (modalEmail: TemplateRef<NgbModalRef>): void => {
    this.modalReference = this._modalService.open(modalEmail);
  }
  cerrarModalEmail = (): void => {
    this.miForm.get('email').reset();
    this.modalReference.close();
  }

  regresar = () => {
    history.back();
  }
}
