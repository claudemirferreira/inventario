import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { ExecucaoService } from 'src/app/services/execucao.service';
import { ContagemService } from 'src/app/services/contagem.service';
import { Inventario } from 'src/app/model/inventario';
import { Execucao } from 'src/app/model/execucao';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MensagemErrorComponent } from '../share/mensagem-error/mensagem-error.component';


interface StatusInventario {
  id: string;
  nome: string;
}

class ContagemDto {
  idInventario: number;
}

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.css']
})
export class ExecucaoComponent implements OnInit {

  listInventario: Inventario[];
  inventarioSelecionado = new Inventario();

  list$: Observable<Execucao[]>;
  objeto = new Execucao();

  contagemDto = new ContagemDto();


  listStatus: StatusInventario[] = [
    { id: '1', nome: '1 PRIMEIRA CONTAGEM' },
    { id: '2', nome: '2 PRIMEIRA CONTAGEM' },
    { id: '3', nome: '3 PRIMEIRA CONTAGEM' }
  ];

  displayedColumns: string[] = [
    'numeroContagem',
    'inicio',
    'fim',
    'acao',
  ];

  constructor(private inventarioService: InventarioService
    , private service: ExecucaoService
    , private contagemService: ContagemService
    , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.objeto = new Execucao();
    this.findAllInventario();
  }

  changeInventario() {
    this.findByIdInventario(this.inventarioSelecionado.id);
  }

  buscarInventario() {
    this.inventarioService.findById(this.inventarioSelecionado.id).subscribe(
      (data: Inventario) => {
        this.inventarioSelecionado = data;
        console.log(JSON.stringify(this.inventarioSelecionado));
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }


  delete(element){}

  iniciarContagem(execucao: Execucao) {

    let data = execucao;
    data.inicio = new Date();
    let inventario = new Inventario();
    inventario.id =this.inventarioSelecionado.id;
    data.inventario = inventario;
    console.log(execucao.inicio);

    this.service.iniciarContagem(data).subscribe(
      (list: Observable<Execucao[]>) => {
        this.list$ = list;        
        //this.changeInventario();
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

  finalizarContagem(execucao: Execucao) {
    let inventario = new Inventario();
    inventario.id = this.inventarioSelecionado.id;
    execucao.fim = new Date();
    execucao.inventario = inventario;
    console.log(execucao.fim);
    
    this.service.finalizarContagem(execucao).subscribe(
      (list: Observable<Execucao[]>) => {
        this.list$ = list;
      },
      (err) => {
        console.log('ERROR =' + err);
        execucao.fim = null;
        this.mensagemError(err.error);
      }
    );    
  }

  findByIdInventario(id: number) {
    this.list$ = this.service.findByIdInventario(id).pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return empty();
      })
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

  mensagemError(msg: string) {
    let dialogRef = this.dialog.open(MensagemErrorComponent, { data: { msg: msg, title:'Mensagem de Erro' } })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleError() {
    //this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    console.log('ocorreu um erro, tente mais tarde');
  }


}
