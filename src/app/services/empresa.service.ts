import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.API}/empresa`);
  }

  find(objeto: Empresa) {
    return this.http.post(`${environment.API}/empresa/find`, objeto);
  }

  save(objeto: Empresa) {
    return this.http.post(`${environment.API}/empresa`, objeto);
  }

  findById(cnpj: string) {
    return this.http.get(`${environment.API}/empresa/`+cnpj);
  }

  delete(cnpj: string) {
    return this.http.delete(`${environment.API}/empresa/`+cnpj);
  }

}
