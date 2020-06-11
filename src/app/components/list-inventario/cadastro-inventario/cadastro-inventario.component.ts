import { Component, OnInit, Input } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/model/inventario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router, ActivatedRoute } from '@angular/router';
import { Execucao } from 'src/app/model/execucao';
import { ExecucaoService } from 'src/app/services/execucao.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-inventario',
  templateUrl: './cadastro-inventario.component.html',
  styleUrls: ['./cadastro-inventario.component.css'],
})
export class CadastroInventarioComponent implements OnInit {
  objeto: Inventario;
  public list = [];

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Salvar',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'save',
    },
  };

  formGroup: FormGroup;

  constructor(
    private service: InventarioService,
    private execucaoService: ExecucaoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.objeto = new Inventario();
    var id = this.route.params.subscribe((params) => {
      var id = params['id'];
      if (!id) {
        this.objeto = new Inventario();
        this.objeto.id = 0;
        this.objeto.numeroContagem = '1';
      } else {
        this.service.findById(id).subscribe(
          (inventario: Inventario) => {
            this.objeto = inventario;
            console.log(JSON.stringify(this.objeto));
          },
          (err) => {
            console.log('ocorreu um erro');
          }
        );
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, Validators.required],
      data: [null, Validators.required],
    });
  }


  saveExecucao(): void {
    this.setData();
    this.execucaoService.save(this.list).subscribe(
      (data: Execucao) => {
        //this.objeto = data;
      },
      (err) => {
        console.log('erro de autenticação=' + JSON.stringify(err.status));
        if (err.status == '400')
          console.log('ocorreu um erro');
        else
          console.log('ocorreu um erro');
      }
    );
  }

  setData() {
    let execucao1 = new Execucao();
    execucao1.inicio = null;
    execucao1.fim = null;
    execucao1.inventario = this.objeto;
    execucao1.descricao = '';
    execucao1.numeroContagem = '1';
    this.list.push(execucao1);

    let execucao2 = new Execucao();
    execucao2.inicio = null;
    execucao2.fim = null;
    execucao2.inventario = this.objeto;
    execucao2.descricao = '';
    execucao2.numeroContagem = '2';
    this.list.push(execucao2);

    let execucao3 = new Execucao();
    execucao3.inicio = null;
    execucao3.fim = null;
    execucao3.inventario = this.objeto;
    execucao3.descricao = '';
    execucao3.numeroContagem = '3';
    this.list.push(execucao3);

  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty,
    };
  }

  save(): void {
    if (this.objeto.id == 0)
      this.objeto.numeroContagem = '1';
    this.service.save(this.objeto).subscribe(
      (data: Inventario) => {
        this.objeto = data;
        this.openSnackBar('Operação realizada com sucesso', 'OK');
        this.saveExecucao();
      },
      (err) => {
        console.log('erro de autenticação=' + JSON.stringify(err.status));
        this.openSnackBar('Error: '+ err.error.error, 'OK');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
