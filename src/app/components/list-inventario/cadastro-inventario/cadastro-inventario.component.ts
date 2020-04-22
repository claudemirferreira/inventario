import { Component, OnInit, Input } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/model/inventario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-inventario',
  templateUrl: './cadastro-inventario.component.html',
  styleUrls: ['./cadastro-inventario.component.css'],
})
export class CadastroInventarioComponent implements OnInit {
  objeto: Inventario;

  listStatus = [
    { id: 'C', nome: 'CADASTRADO' },
    { id: 'P', nome: '1º CONTAGEM' },
    { id: 'S', nome: '2º CONTAGEM' },
    { id: 'T', nome: '3º CONTAGEM' },
    { id: 'F', nome: 'FINALIZADO' },
  ];

  @Input() message: string | null;
  classCss: {};
  //
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
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.objeto = new Inventario();
    var id = this.route.params.subscribe((params) => {
      var id = params['id'];
      if (!id) {
        this.objeto = new Inventario();
        this.objeto.id = 0;
        this.objeto.status = 'C';
        this.listStatus = [{ id: 'C', nome: 'CADASTRADO' }];
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

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty,
    };
  }

  save(): void {
    this.spinnerButtonOptions.active = true;
    setTimeout(() => {
      this.message = '';
      if (this.objeto.id == 0)
        this.objeto.status = 'C';
      this.service.save(this.objeto).subscribe(
        (data: Inventario) => {
          this.objeto = data;
          this.message = 'Operacao realizada com sucesso';
        },
        (err) => {
          console.log('erro de autenticação=' + JSON.stringify(err.status));
          if (err.status == '400')
            this.message =
              'Ja existe um usuario com o logn ' + this.objeto.nome;
          else this.message = 'Erro: entre em contato com o suporte';
          console.log(this.message);
        }
      );
      this.spinnerButtonOptions.active = false;
    }, 3500);
  }
}
