import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Inventario } from '../../model/inventario';
import { InventarioService } from './../../services/inventario.service';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  public list: Inventario[];

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = ELEMENT_DATA;

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
  ];

  constructor(private service: InventarioService) {
    this.findAll();
  }

  ngOnInit(): void {
    //this.findAll();
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


}
