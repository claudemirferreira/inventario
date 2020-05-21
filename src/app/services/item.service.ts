import { Injectable } from '@angular/core';
import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  import(inventarioId: number) {
    return this.http.get(`${INVENTARIO_API}/item/importItens/`+inventarioId);
  }
}
