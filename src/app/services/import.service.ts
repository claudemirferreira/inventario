import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDto } from '../model/item-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.API}/import`);
  }

  save(objeto: ItemDto) {
    return this.http.post(`${environment.API}/import`, objeto);
  }

  findById(id: number) {
    return this.http.get(`${environment.API}/import/`+id);
  }

  saveAll(list: ItemDto[], inventarioId: number) {
    console.log('/item-import/all');
    return this.http.post(`${environment.API}/item-import/all/`+inventarioId, list);
  }

}
