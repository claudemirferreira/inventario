import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INVENTARIO_API } from './inventario.api';
import { Contagem } from '../model/contagem';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContagemService {

  constructor(private http: HttpClient) { }  

  findByIdInventario(id: number) {
    return this.http.get<Contagem[]>(`${INVENTARIO_API}/contagem/inventario/`+id)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }
}
