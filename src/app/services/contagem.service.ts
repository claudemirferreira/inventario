import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contagem } from '../model/contagem';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContagemService {

  constructor(private http: HttpClient) { }

  findByIdInventario(id: number) {
    return this.http.get<Contagem[]>(`${environment.API}/contagem/inventario/`+id)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }
}
