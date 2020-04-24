import { Injectable } from '@angular/core';
import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';
import { Execucao } from '../model/execucao';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${INVENTARIO_API}/execucao`);
  }

  save(objeto: Execucao) {
    return this.http.post(`${INVENTARIO_API}/execucao`, objeto);
  }

  findById(id: number) {
    return this.http.get(`${INVENTARIO_API}/execucao/`+id);
  }

  delete(id: number) {
    return this.http.delete(`${INVENTARIO_API}/execucao/`+id);
  }
  
}
