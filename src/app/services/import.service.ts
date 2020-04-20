import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INVENTARIO_API } from './inventario.api';
import { ItemDto } from '../model/item-dto';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${INVENTARIO_API}/import`);
  }

  save(objeto: ItemDto) {
    return this.http.post(`${INVENTARIO_API}/import`, objeto);
  }

  findById(id: number) {
    return this.http.get(`${INVENTARIO_API}/import/`+id);
  }

  saveAll(list: ItemDto[]) {
    console.log('/item-import/all');
    return this.http.post(`${INVENTARIO_API}/item-import/all`, list);
  }

}
