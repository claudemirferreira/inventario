import { UserFilter } from './../filters/user-filter';
import { BasePaginatedResponse } from './../base/base-paginated.response';
import { Injectable } from '@angular/core';
import { Autentication } from '../model/autentication';
<<<<<<< HEAD
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from './api';
import { INVENTARIO_API } from './inventario.api';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> master

import { User } from '../model/user';
import { environment } from 'src/environments/environment';

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
    return this.http.post(`${environment.API}/user/authentication`,user);
  }

  createOrUpdate(user: User){
<<<<<<< HEAD
    if(user.codigo != null){
      return this.http.put(`${API}/user/${user.codigo}`,user);
=======
    if(user.codigo != null && user.codigo > 0){
      return this.http.put(`${environment.API}/user`,user);
>>>>>>> master
    } else {
      user.codigo = null;
      return this.http.post(`${environment.API}/user`, user);
    }
  }

  update(user: User){
<<<<<<< HEAD
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
=======
    return this.http.put(`${environment.API}/user`,user);
  }

  findAll(page:number,count:number){
    return this.http.get(`${environment.API}/user/${page}/${count}`);
>>>>>>> master
  }

  findById(codigo:number){
    return this.http.get(`${environment.API}/user/${codigo}`);
  }

  delete(codigo:number){
    return this.http.delete(`${environment.API}/user/${codigo}`);
  }

  find(nome: string) {
    console.log('search');
    this.param = 'nome='+nome;

    return this.http.get(`${environment.API}/user/search?`+this.param);
  }

  pesquisar(user: User, param: string) {
    console.log('pesquisar');
    return this.http.post(`${environment.API}/user/pesquisar`+param, user);
  }

  alterarSenha(user: User){
    return this.http.put(`${environment.API}/user/alterar-senha`,user);
  }


}
