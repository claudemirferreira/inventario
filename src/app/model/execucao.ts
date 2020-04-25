import { Inventario } from './inventario';

export class Execucao {

    id: number;

    inicio: Date;

    fim: Date;

    status: string;

    descricao: string;    

    inventario: Inventario;

}
