import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Shops!: any;
  loading!: Boolean;
  url: string = "https://3000-nabb0-biggamesdefiniti-vj729tfxb7y.ws-eu77.gitpod.io/pandas/staff";

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