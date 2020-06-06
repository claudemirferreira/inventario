import { Injectable } from '@angular/core';
import { Autentication } from '../model/autentication';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  page :string;
  size :string;
  param = '';

  constructor(private http: HttpClient) {}

  login(user: Autentication){
    console.log(JSON.stringify(user));
    return this.http.post(`${environment.API}/user/authentication`,user);
  }

  createOrUpdate(user: User){
    if(user.codigo != null && user.codigo > 0){
      return this.http.put(`${environment.API}/user`,user);
    } else {
      user.codigo = null;
      return this.http.post(`${environment.API}/user`, user);
    }
  }

  update(user: User){
    return this.http.put(`${environment.API}/user`,user);
  }

  findAll(page:number,count:number){
    return this.http.get(`${environment.API}/user/${page}/${count}`);
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
