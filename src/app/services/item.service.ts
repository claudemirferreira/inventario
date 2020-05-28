import { Injectable } from '@angular/core';
import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  import(inventarioId: number) {
    return this.http.get(`${INVENTARIO_API}/item/importItens/`+inventarioId);
  }

  findByIdInventario(inventarioId: number) {
    return this.http.get<Item[]>(`${INVENTARIO_API}/item/inventario/`+inventarioId)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }
}
