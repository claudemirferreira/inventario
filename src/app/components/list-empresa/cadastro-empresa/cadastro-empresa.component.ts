import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/model/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';


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
  loading: Boolean;

  constructor(
    private service: EmpresaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.toastr.clear();
    this.loading = false;
    this.objeto = new Empresa();
    this.loadCompanyData()
  }

  loadCompanyData() {
    this.route.params.subscribe((params) => {
      var cnpj = params['cnpj'];
      console.log(cnpj);
      if (!cnpj) {
        this.objeto = new Empresa();
      } else {
        this.service.findById(cnpj).subscribe(
          (empresa: Empresa) => {
            this.objeto = empresa;
            this.isReadonly = true;
          },
          (err) => {
            console.log('ocorreu um erro');
            this.toastr.error("Erro ao obter dados da empresa");
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

  save(formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.loading = true

    if (this.formGroup.invalid) {
      return;
    }

    if (this.isCnpjValid(this.objeto.cnpj)) {

      let service = this.isReadonly ? this.service.update(this.objeto) : this.service.save(this.objeto); 

      service.subscribe(
        (data: Empresa) => {
          this.toastr.success("Operação realizada com sucesso");
          this.onReset(formDirective);
          this.isReadonly = false;
          this.loading = false;
        },
        (err) => {
          console.log(err.error.message);
          this.toastr.error(err.error.message, "Erro ao salvar a empresa");
          this.isReadonly = false;
        }
      );
    } else {
      this.toastr.error("Error: CNPJ é invalido");
      this.formGroup.get('cnpj').setErrors({'incorrect': true});
      this.loading = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onReset(formDirective: FormGroupDirective) {
    this.submitted = false;
    this.formGroup.reset();
    formDirective.resetForm();
  }

  /**
   * Rules geted from 
   * https://github.com/alvaropaco/ng-cpf-cnpj-validate
   * 
   * @param cnpj 
   */
  private isCnpjValid(cnpj: string): boolean {
    var tamanho;
    var numeros;
    var digitos;
    var soma;
    var pos;
    var resultado;
    var i;

    if (cnpj == '')
      return false;

    if (cnpj.length != 14)
      return false;

    // Regex to validate strings with 14 same characters
    var regex = /([0]{14}|[1]{14}|[2]{14}|[3]{14}|[4]{14}|[5]{14}|[6]{14}|[7]{14}|[8]{14}|[9]{14})/g

    // Regex builder
    var patt = new RegExp(regex);
    if (patt.test(cnpj))
      return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1))
      return false;

    return true;
  }

}
