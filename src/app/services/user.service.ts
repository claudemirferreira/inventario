import { UserFilter } from './../filters/user-filter';
import { BasePaginatedResponse } from './../base/base-paginated.response';
import { Injectable } from '@angular/core';
import { Autentication } from '../model/autentication';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from './api';
import { INVENTARIO_API } from './inventario.api';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected serverUrl;
  
  page :string;
  size :string;
  param = '';

  constructor(private http: HttpClient) {
    this.serverUrl = `${INVENTARIO_API}/user/`;
  }

  login(user: Autentication){
    console.log(JSON.stringify(user));
    return this.http.post(`${API}/user/authentication`,user);
  }

  createOrUpdate(user: User){
    if(user.codigo != null){
      return this.http.put(`${API}/user/${user.codigo}`,user);
    } else {
      user.codigo = null;
      return this.http.post(`${API}/user`, user);
    }
  }

  update(user: User){
    return this.http.put(`${API}/user/${user.codigo}`,user);
  }

  findAll(filters?: UserFilter){
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(function (key) {
          if (filters[key] !== null && filters[key] !== undefined) {
              params = params.append(key, filters[key]);
          }
      });
    }
    return this.http.get<BasePaginatedResponse<User>>(this.serverUrl, {params});
  }

  findById(codigo:number){
    return this.http.get(`${API}/user/${codigo}`);
  }

  delete(codigo:number){
    return this.http.delete(`${API}/user/${codigo}`);
  }

  find(nome: string) {
    console.log('search');
    this.param = 'nome='+nome;

    return this.http.get(`${API}/user/search?`+this.param);
  }

  pesquisar(user: User, param: string) {
    console.log('pesquisar');
    return this.http.post(`${API}/user/pesquisar`+param, user);
  }

  alterarSenha(user: User){
    return this.http.put(`${API}/user/alterar-senha`,user);
  }


}
