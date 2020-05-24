import { Item } from './item';
import { Contagem } from './contagem';

export class Endereco {

    id: number;

    descricao: string;

    item: Item;

    contagens: Contagem[];
    
}
