import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Arqueo } from 'src/app/models/caja/arqueo';
import { BASE_URL } from 'src/environments/configurations';

@Injectable({
  providedIn: 'root',
})
export class ArqueoService {
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  registrarAperturaArqueo(arqueo: Arqueo): Observable<any> {
    return this.http
      .post(this.url + 'register/new/arqueo-caja', arqueo, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          catchError((e) => {
            if (e.status === 409) {
              return throwError(e);
            }
            return throwError(e);
          })
        )
      );
  }

  //listar arqueos paginado
  obtenerArqueosFecha(page: number, desde: Date, hasta: Date): Observable<any> {
    let api: string =
      'get/arqueos-caja/from/' + desde + '/to/' + hasta + '/page/' + page;
    return this.http.get(this.url + api).pipe(
      map((response: any) => {
        return response.arqueos;
      }),
      catchError((e) => {
        console.log('Error service paginacion arque: ' + e.error);
        return throwError(e);
      })
    );
  }
}
