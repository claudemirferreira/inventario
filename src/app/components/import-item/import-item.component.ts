import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/model/response-api';
import { ItemDto } from 'src/app/model/item-dto';
import { ImportService } from 'src/app/services/import.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/model/item';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventario } from 'src/app/model/inventario';

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
  inventarioId: number;

  displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'endereco', 'boleto', 'quantidade'];

  constructor(private service: ImportService
    , private itemService: ItemService
    , private enderecoService: EnderecoService
    , private router: Router
    , private route: ActivatedRoute
    , private _snackBar: MatSnackBar) { }

  ngOnInit() {
    var inventarioId = this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.inventarioId = Number.parseInt( params['id']);
      console.log("id="+this.inventarioId);
      
    });
  }

  importItens() {
    this.itemService.import(this.inventarioId).subscribe(
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
      var inventario = new Inventario();
      inventario.id = this.inventarioId;
      this.list.forEach(element => {
        element.inventario = inventario;
      });

      this.service.saveAll(this.list).subscribe(
        (list: ItemDto[]) => {
          this.list = list;// 
          //this.importItens(); 
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
