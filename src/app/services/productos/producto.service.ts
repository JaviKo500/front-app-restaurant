import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/environments/configurations';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { Producto } from 'src/app/models/productos/producto';
import { Categoria } from 'src/app/models/productos/categoria';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  ObtenerProducto(id: number): Observable<Producto> {
    return this.http.get(this.url + 'get/product/' + id).pipe(
      map((response: any) => response.producto as Producto),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  ObtenerProductosPageable(page: number): Observable<any> {
    return this.http.get(this.url + 'get/products/' + page).pipe(
      map((response: any) => {
        return response.productos;
      }),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  RegistarProducto(producto: Producto): Observable<Producto> {
    return this.http
      .post(this.url + 'register/product', producto, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  updateProduct(producto: Producto): Observable<Producto> {
    return this.http
      .put(this.url + 'update/product/' + producto.id, producto, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/product/' + id).pipe(
      map((response: any) => response.mensaje),
      catchError((e) => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
