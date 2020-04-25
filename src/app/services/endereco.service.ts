import { Injectable } from '@angular/core';
import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  import() {
    return this.http.get(`${INVENTARIO_API}/endereco`);
  }
}
