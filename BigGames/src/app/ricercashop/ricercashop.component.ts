import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ricercashop',
  templateUrl: './ricercashop.component.html',
  styleUrls: ['./ricercashop.component.css']
})
export class RicercashopComponent {
    Shops!: any;
    loading!: Boolean;
    url: string = "https://3000-nabb0-biggamesdefiniti-0bjhygo6nlx.ws-eu77.gitpod.io/negozio";


    constructor(public http: HttpClient) {
    this.get(this.url);
}


  get(url: string): void {
    this.loading = true;
    this.http.get(url).subscribe(data => {
      this.Shops = data;
      console.log(data)
      this.loading = false;
    });
  }

  // previousSearch: string = '';
  // onKey(value: string) {
  //   if (value != this.previousSearch) {
  //     this.get(this.url + "?store_name=" + value);
  //     this.previousSearch = value;
  //   }
  // }

  onKey(value: string) {
    this.get(this.url + "?store_name=" + value);
  }
}