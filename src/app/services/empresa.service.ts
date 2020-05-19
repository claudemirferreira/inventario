import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${INVENTARIO_API}/empresa`);
  }

  find(objeto: Empresa) {
    return this.http.post(`${INVENTARIO_API}/empresa/find`, objeto);
  }

  save(objeto: Empresa) {
    return this.http.post(`${INVENTARIO_API}/empresa`, objeto);
  }

  findById(cnpj: string) {
    return this.http.get(`${INVENTARIO_API}/empresa/`+cnpj);
  }

  delete(cnpj: string) {
    return this.http.delete(`${INVENTARIO_API}/empresa/`+cnpj);
  }

}
