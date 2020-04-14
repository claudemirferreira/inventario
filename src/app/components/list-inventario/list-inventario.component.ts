import { Component, OnInit, Input } from '@angular/core';
import { Inventario } from 'src/app/model/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-list-inventario',
  templateUrl: './list-inventario.component.html',
  styleUrls: ['./list-inventario.component.css']
})
export class ListInventarioComponent implements OnInit {

  public objeto: Inventario;
  public list: Inventario[];
  
  @Input() message: string | null;

  //
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Shearch...',
    spinnerSize: 15,
    raised: true,
    fab: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    icon: {
      fontIcon: 'fas fa-search',
    },
  };

  displayedColumns: string[] = [
    'id',
    'data',
    'nome',
    'status',
    'acao',
  ];

  constructor(private service: InventarioService) {
    
  }

  ngOnInit(): void {
    this.objeto = new Inventario();
    this.findAll();
  }

  findAll(): void {

    //this.list = Inventario [];
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'shearching...';
    setTimeout(() => {
      this.service.findAll().subscribe(
        (list: Inventario[]) => {
          this.list = list;
          console.log(JSON.stringify(this.list));
        },
        (err) => {
          console.log('ERROR =' + err);
        }
      );

      this.barButtonOptions.active = false;
      this.barButtonOptions.text = 'Search';
    }, 3000);
  }

  find() {
    /*
    this.message ='';
    this.service.pesquisar(this.usuario).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
      if (this.list.length == 0)
        this.message = 'Nenhum registro encontrado.';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
    */
  }

  delete(inventario: Inventario) {
    /*
    return this.service.delete(user.id)
      .subscribe(() => {
        console.log('saved');
        this.find();
      }, 
        error => {
          alert('Ocoreu um erro, entre em contato com o suporte');
          console.log(JSON.stringify(error));
        }
      
      );
      */
  }

}
