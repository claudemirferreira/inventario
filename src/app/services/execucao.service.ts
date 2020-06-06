import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Execucao } from '../model/execucao';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.API}/execucao`);
  }

  save(objeto: Execucao[]) {
    return this.http.post(`${environment.API}/execucao`, objeto);
  }

  iniciarContagem(objeto: Execucao) {
    return this.http.put<Execucao[]>(`${environment.API}/execucao/iniciarContagem/`+objeto.inventario.id, objeto)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  finalizarContagem(objeto: Execucao) {
    return this.http.put<Execucao[]>(`${environment.API}/execucao/finalizarContagem/`+objeto.inventario.id, objeto)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  findById(id: number) {
    return this.http.get(`${environment.API}/execucao/`+id);
  }

  findByIdInventario(id: number) {
    return this.http.get<Execucao[]>(`${environment.API}/execucao/inventario/`+id)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }

  delete(id: number) {
    return this.http.delete(`${environment.API}/execucao/`+id);
  }

}
