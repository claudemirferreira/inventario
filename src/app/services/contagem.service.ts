import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INVENTARIO_API } from './inventario.api';

@Injectable({
  providedIn: 'root'
})
export class ContagemService {

  constructor(private http: HttpClient) { }

  gerarPrimeiraContagem(data) {
    console.log('entrou no gerarPrimeiraContagem');
    return this.http.post(`${INVENTARIO_API}/contagem/gerar-primeira-contagem`, data);
  }
}
