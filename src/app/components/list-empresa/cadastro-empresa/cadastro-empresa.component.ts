import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/model/empresa';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogMensagemComponent } from '../../share/dialog-mensagem/dialog-mensagem.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  objeto: Empresa;

  formGroup: FormGroup;

  isReadonly = false;
  submitted = false;

  constructor(
    private service: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.objeto = new Empresa();
    var cnpj = this.route.params.subscribe((params) => {
      var cnpj = params['cnpj'];
      console.log(cnpj);
      if (!cnpj) {
        this.objeto = new Empresa();
      } else {
        this.service.findById(cnpj).subscribe(
          (empresa: Empresa) => {
            this.objeto = empresa;
            this.isReadonly = true;
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
      cnpj: [null, Validators.required],
      nome: [null, Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty,
    };
  }

  save(): void {
    console.log(JSON.stringify(this.objeto));

    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
        return;
    }
    this.service.save(this.objeto).subscribe(
      (data: Empresa) => {
        this.objeto = data;
        this.isReadonly = true;
        this.openSnackBar('Operação realizada com sucesso', 'OK');
      },
      (err) => {
        console.log('erro de autenticação=' + JSON.stringify(err.status));
        this.openSnackBar('Error: Entre em contato com o suporte', 'OK');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
