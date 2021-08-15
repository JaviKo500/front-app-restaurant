import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../environments/configurations';
import { UsuarioService } from './usuario.service';
import { PasswordRecovery } from '../../models/persona/password-recovery.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService {
  private _url: string = BASE_URL;
  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  recoveryPassword = (recovery: PasswordRecovery): Observable<any> =>  {
    recovery.id = this._authService.usuario.id;
    recovery.oldPassword = '12345';
    recovery.newPassword = '123456';
    console.log(recovery);
    return this._http.put<any>(`${this._url}update/user/password`, recovery);
  }

}
