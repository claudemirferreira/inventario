import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/model/response-api';
import { ItemDto } from 'src/app/model/item-dto';
import { ImportService } from 'src/app/services/import.service';

type AOA = any[][];

@Component({
  selector: 'app-import-item',
  templateUrl: './import-item.component.html',
  styleUrls: ['./import-item.component.css']
})
export class ImportItemComponent implements OnInit {

  willDownload = false;

  list: ItemDto[];

  displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'endereco', 'boleto', 'quantidade'];

  constructor(private service: ImportService) { }

  ngOnInit(){
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
      responseApi= jsonData;
      this.list = responseApi['Sheet1'];

      this.service.saveAll(this.list).subscribe(
        (list: ItemDto[]) => {
          this.list = list;
        },
        (err) => {
          console.log('ERROR =' + err);
        }
      );
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
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

}
