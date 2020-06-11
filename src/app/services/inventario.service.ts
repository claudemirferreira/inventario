import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from '../model/inventario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.API}/inventario`);
  }

  save(objeto: Inventario) {
    return this.http.post(`${environment.API}/inventario`, objeto);
  }

  findById(id: number) {
    return this.http.get(`${environment.API}/inventario/`+id);
  }

  delete(id: number) {
    return this.http.delete(`${environment.API}/inventario/`+id);
  }


}
