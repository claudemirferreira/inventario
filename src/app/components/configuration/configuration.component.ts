import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImportService } from 'src/app/services/import.service';
import { ItemDto } from 'src/app/model/item-dto';
import * as XLSX from 'xlsx';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  willDownload = false;
  list: ItemDto[];
  displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'endereco', 'boleto', 'quantidade'];

  constructor(private _formBuilder: FormBuilder
              , private service: ImportService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

  importarItens(){
    alert('importarItens');
  }


}
