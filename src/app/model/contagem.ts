import { Inventario } from './inventario';
import { Endereco } from './endereco';

export class Contagem {
  
    id: number;

    numeroContagem: string;

    status: string;

    quantidade: number;

    data: Date;

    observacao: string;

    inventario: Inventario;
    
    endereco: Endereco;

}