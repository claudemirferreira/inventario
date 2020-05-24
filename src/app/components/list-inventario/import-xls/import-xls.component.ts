import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDto } from 'src/app/model/item-dto';
import { Item } from 'src/app/model/item';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/model/response-api';
import { Inventario } from 'src/app/model/inventario';
import { ImportService } from 'src/app/services/import.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-xls',
  templateUrl: './import-xls.component.html',
  styleUrls: ['./import-xls.component.css'],
})
export class ImportXlsComponent implements OnInit {
  willDownload = false;

  list: ItemDto[];
  listItem: Item[];
  inventario: Inventario;

  constructor(
    private service: ImportService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inventario = data.inventario;
  }

  ngOnInit(): void {}

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      let responseApi: ResponseApi;
      responseApi = jsonData;
      this.list = responseApi['Sheet1'];
      this.list.forEach((element) => {
        element.inventario = this.inventario;
      });

      this.service.saveAll(this.list, this.inventario.id).subscribe(
        (list: ItemDto[]) => {
          this.list = list;
          this.openSnackBar('Operação realizada com sucesso', 'OK');
        },
        (err) => {
          console.log('ERROR =' + err);
        }
      );
      const dataString = JSON.stringify(jsonData);
      //document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    };
    reader.readAsBinaryString(file);
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute(
        'href',
        `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      );
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
