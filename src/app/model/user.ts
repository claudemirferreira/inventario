import { Perfil } from './perfil';
import { Empresa } from './empresa';

export class User {

  codigo: number;

  nome: String;

  username: String;

  password: String;

  active: Boolean;

  empresa: Empresa;

  perfis: Perfil[];

  count: number;

  constructor() { }

}
