import { ToastrService } from 'ngx-toastr';
import { EmpresaFilter } from './../../filters/empresa-filter';
import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogMensagemComponent } from '../share/dialog-mensagem/dialog-mensagem.component';

@Component({
  selector: 'app-list-empresa',
  templateUrl: './list-empresa.component.html',
  styleUrls: ['./list-empresa.component.css']
})
export class ListEmpresaComponent implements OnInit {

  public objeto: Empresa;
  public filter: EmpresaFilter;
  public list: Empresa[];

  displayedColumns: string[] = [
    'cnpj',
    'nome',
    'endereco',
    'email',
    'acao',
  ];

  constructor(
    private service: EmpresaService,
    private toastr: ToastrService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.objeto = new Empresa();
    this.filter = new EmpresaFilter();
    this.find();
  }

  find(): void {
    this.service.find(this.filter).subscribe(
      (list: Empresa[]) => {
        this.list = list;
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

  delete(empresa: Empresa) {
    this.service.delete(empresa.cnpj).subscribe((responseApi: any) => {
      console.log(responseApi);
      this.find();
      this.toastr.success('Operação realizada com sucesso');
    }, err => {
      this.toastr.error(err.error.message, "Erro ao remover a empresa");
    });
  }

  confirmaExclusao(empresa: Empresa) {
    let dialogRef = this.dialog.open(DialogMensagemComponent, { data: { msg: 'Deseja excluir a empresa ' + empresa.nome + ' ?', title: 'Mensagem de Confirmação' } })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "true") {
        this.delete(empresa);
      } else {
        console.log("cancelar");
      }
    });
  }

}
