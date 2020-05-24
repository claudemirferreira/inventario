import { Component, OnInit, Input } from '@angular/core';
import { Inventario } from 'src/app/model/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportXlsComponent } from './import-xls/import-xls.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-inventario',
  templateUrl: './list-inventario.component.html',
  styleUrls: ['./list-inventario.component.css']
})
export class ListInventarioComponent implements OnInit {

  public objeto: Inventario;
  public list: Inventario[];

  @Input() message: string | null;

  displayedColumns: string[] = [
    'id',
    'data',
    'nome',
    'status',
    'acao',
  ];

  constructor(private service: InventarioService
    ,private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.objeto = new Inventario();
    this.findAll();
  }

  findAll(): void {
    setTimeout(() => {
      this.service.findAll().subscribe(
        (list: Inventario[]) => {
          this.list = list;
        },
        (err) => {
          console.log('ERROR =' + err);
        }
      );
    }, 3000);
  }

  delete(inventario: Inventario) {
    this.service.delete(inventario.id).subscribe((responseApi: any) => {
      console.log(responseApi);

    }, err => {
      if (err.status == '200') {
        this.findAll();
        this.openSnackBar( 'Operação realizada com sucesso', 'OK');
      } else
        this.openSnackBar( 'Error: Entre em contato com o suporte', 'OK');
        console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialogXls(inventario: Inventario) {
    let dialogRef = this.dialog.open(ImportXlsComponent, { data: {inventario: inventario}})
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

}
