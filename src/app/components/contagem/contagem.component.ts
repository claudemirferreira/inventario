import { Component, OnInit } from '@angular/core';
import { ContagemService } from 'src/app/services/contagem.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/model/inventario';
import { Observable, empty } from 'rxjs';
import { Contagem } from '../../model/contagem';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-contagem',
  templateUrl: './contagem.component.html',
  styleUrls: ['./contagem.component.css']
})
export class ContagemComponent implements OnInit {

  listInventario: Inventario[];
  inventarioSelecionado = new Inventario();
  list$: Observable<Contagem[]>;

  displayedColumns: string[] = [
    'codigo',
    'nome',
    'descricao',
    'numeroContagem',
    'status',
    'quantidade',
  ];

  constructor( private service: ContagemService,
               private inventarioService: InventarioService
    ) { }

  ngOnInit(): void {
    this.findAllInventario();
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

  changeInventario() {
    console.log('changeInventario='+this.inventarioSelecionado.id);
    this.findByIdInventario(this.inventarioSelecionado.id);
  }

  findByIdInventario(id: number) {

    console.log('findByIdInventario='+id);

    this.service.findByIdInventario(id).subscribe(
      (list: Observable<Contagem[]>) => {
        this.list$ = list;
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

}
