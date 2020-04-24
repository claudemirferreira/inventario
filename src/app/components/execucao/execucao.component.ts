import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { ExecucaoService } from 'src/app/services/execucao.service';
import { Inventario } from 'src/app/model/inventario';
import { Execucao } from 'src/app/model/execucao';


interface StatusInventario {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.css']
})
export class ExecucaoComponent implements OnInit {

  listInventario: Inventario[];
  list: Execucao[];

  listStatus: StatusInventario[] = [
    { id: '1', nome: '1 PRIMEIRA CONTAGEM' },
    { id: '2', nome: '2 PRIMEIRA CONTAGEM' },
    { id: '3', nome: '3 PRIMEIRA CONTAGEM' }
  ];

  constructor(private inventarioService: InventarioService
    , private service: ExecucaoService) { }

  ngOnInit(): void {
    this.findAllInventario();
  }

  findAll() { }

  findAllInventario(): void {
    this.inventarioService.findAll().subscribe(
      (listInventario: Inventario[]) => {
        this.listInventario = listInventario;
        console.log(JSON.stringify(this.listInventario));
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

}
