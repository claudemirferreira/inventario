import { InventarioService } from './../../services/inventario.service';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Inventario } from 'src/app/model/inventario';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  listInventario: Inventario[];
  inventarioSelecionado = new Inventario();
  list$: Observable<Item[]>;

  displayedColumns: string[] = [
    'codigo',
    'nome',
    'quantidadeSistema',
    'primeiraContagem',
    'segundaContagem',
    'terceiraContagem',
    'quantidadeFisica'
  ];

  constructor(
    private service: ItemService,
    private inventarioService: InventarioService
  ) {}

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
      (list: Observable<Item[]>) => {
        this.list$ = list;
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

}
