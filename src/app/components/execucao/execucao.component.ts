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

  objeto: Execucao;
  inventario = new Inventario();

  listStatus: StatusInventario[] = [
    { id: '1', nome: '1 PRIMEIRA CONTAGEM' },
    { id: '2', nome: '2 PRIMEIRA CONTAGEM' },
    { id: '3', nome: '3 PRIMEIRA CONTAGEM' }
  ];

  displayedColumns: string[] = [
    'status',
    'inicio',
    'fim',
    'descricao',
    'acao',
  ];

  constructor(private inventarioService: InventarioService
    , private service: ExecucaoService) { }

  ngOnInit(): void {
    this.objeto = new Execucao();
    this.findAllInventario();
  }

  changeInventario() {
    console.log('changeInventario findAll');
    this.findAll();

  }

  setData() {    
    this.objeto.inicio = new Date();
    this.objeto.fim = null;
    this.objeto.inventario = this.inventario;
    this.objeto.descricao= ''; 
  }

  save(): void {
    this.setData();
    this.service.save(this.objeto).subscribe(
      (data: Execucao) => {
        this.objeto = data;
      },
      (err) => {
        this.findAll();
        console.log('erro de autenticação=' + JSON.stringify(err.status));
        if (err.status == '400')
          console.log('ocorreu um erro');
        else
          console.log('ocorreu um erro');
      }
    );
  }

  delete(element){}


  start() {

  }

  findAll() {
    this.service.findAll().subscribe(
      (list: Execucao[]) => {
        this.list = list;
        console.log(JSON.stringify(this.list));
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

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
