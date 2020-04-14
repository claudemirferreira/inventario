import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from '../model/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${INVENTARIO_API}/inventario`);
  }

  save(objeto: Inventario) {
    return this.http.post(`${INVENTARIO_API}/inventario`, objeto);
  }

  findById(id: number) {
    return this.http.get(`${INVENTARIO_API}/inventario/`+id);
  }


}
