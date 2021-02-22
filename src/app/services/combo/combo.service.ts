import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/configurations';

@Injectable({
  providedIn: 'root',
})
export class ComboService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
}
