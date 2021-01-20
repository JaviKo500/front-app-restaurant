import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/configurations';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  
  ObtenerMesasPageable(page: number): Observable<any> {
    return this.http.get(this.url + 'get/mesa/' + page).pipe(
      map((response: any) => {
        return response.mesa;
      }),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  } 
}
