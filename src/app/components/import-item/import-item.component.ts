import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/model/response-api';
import { ItemDto } from 'src/app/model/item-dto';
import { ImportService } from 'src/app/services/import.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/model/item';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type AOA = any[][];

@Component({
  selector: 'app-import-item',
  templateUrl: './import-item.component.html',
  styleUrls: ['./import-item.component.css']
})
export class ImportItemComponent implements OnInit {

  willDownload = false;

  list: ItemDto[];
  listItem: Item[];

  displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'endereco', 'boleto', 'quantidade'];

  constructor(private service: ImportService
    , private itemService: ItemService
    , private enderecoService: EnderecoService
    , private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  importItens() {
    this.itemService.import().subscribe(
      (list: Item[]) => {
        this.listItem = list;
        this.openSnackBar( 'Operação realizada com sucesso', 'OK');
        this.importEnderecos();
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

  importEnderecos() {
    this.enderecoService.import().subscribe(
      (list: Item[]) => {
        this.listItem = list;
        //this.openSnackBar( 'Operação realizada com sucesso', 'OK');
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

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

      this.service.saveAll(this.list).subscribe(
        (list: ItemDto[]) => {
          this.list = list;
          this.openSnackBar( 'Operação realizada com sucesso', 'OK');
        },
        (err) => {
          console.log('ERROR =' + err);
        }
      );
      const dataString = JSON.stringify(jsonData);
      //document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
