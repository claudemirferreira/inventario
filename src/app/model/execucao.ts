import { Inventario } from './inventario';

export class Execucao {

    id: number;

    inicio: Date;

    fim: Date;

    status: number;

    descricao: string;    

    inventario: Inventario;

}
