import { Injectable } from '@angular/core';
import { INVENTARIO_API } from './inventario.api';
import { HttpClient } from '@angular/common/http';
import { Execucao } from '../model/execucao';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${INVENTARIO_API}/execucao`);
  }

  save(objeto: Execucao[]) {
    return this.http.post(`${INVENTARIO_API}/execucao`, objeto);
  }

  iniciarContagem(objeto: Execucao) {
    return this.http.put<Execucao[]>(`${INVENTARIO_API}/execucao/iniciar-contagem/`+objeto.id, objeto)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  finalizarContagem(objeto: Execucao) {
    return this.http.put<Execucao[]>(`${INVENTARIO_API}/execucao/finalizar-contagem/`+objeto.id, objeto)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  findById(id: number) {
    return this.http.get(`${INVENTARIO_API}/execucao/`+id);
  }

  findByIdInventario(id: number) {
    return this.http.get<Execucao[]>(`${INVENTARIO_API}/execucao/inventario/`+id)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }

  delete(id: number) {
    return this.http.delete(`${INVENTARIO_API}/execucao/`+id);
  }
  
}
