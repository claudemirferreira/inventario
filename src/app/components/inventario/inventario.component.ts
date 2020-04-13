import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Inventario } from '../../model/inventario';
import { InventarioService } from './../../services/inventario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  list: Inventario[];

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


  constructor(private service: InventarioService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {

    this.list =[];
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'shearching...';
    setTimeout(() => {
      this.service.findAll().subscribe(
        (list: Inventario[]) => {
          this.list = list;
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
