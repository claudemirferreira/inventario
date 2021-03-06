import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Perfil } from '../model/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  findPerfil() {
    return this.http.get<Perfil[]>(`${environment.API}/perfil/find-perfil`);
  }

}
