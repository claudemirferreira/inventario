import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  import(inventarioId: number) {
    return this.http.get(`${environment.API}/item/importItens/`+inventarioId);
  }

  findByIdInventario(inventarioId: number) {
    return this.http.get<Item[]>(`${environment.API}/item/inventario/`+inventarioId)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }
}
