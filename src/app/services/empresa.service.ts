import { EmpresaFilter } from './../filters/empresa-filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.API}/empresa/find`);
  }

  find(objeto: EmpresaFilter) {
    let query = new HttpParams()
      .set('cnpj', objeto.cnpj)
      .set('nome', objeto.nome);
    return this.http.get(`${environment.API}/empresa/find`, {params:query});
  }

  save(objeto: Empresa) {
    return this.http.post(`${environment.API}/empresa`, objeto);
  }

  update(objeto: Empresa) {
    return this.http.put(`${environment.API}/empresa`, objeto);
  }

  findById(cnpj: string) {
    return this.http.get(`${environment.API}/empresa/`+cnpj);
  }

  delete(cnpj: string) {
    return this.http.delete(`${environment.API}/empresa/`+cnpj);
  }

}
