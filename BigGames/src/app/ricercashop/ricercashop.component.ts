import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ricercashop',
  templateUrl: './ricercashop.component.html',
  styleUrls: ['./ricercashop.component.css']
})
export class RicercashopComponent {
  Shops: any = [];
  loading!: Boolean;
  url: string = "http://192.168.1.125:3000/negozio";

  constructor(public http: HttpClient, private router: Router) {
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

  

  onKey(value: string) {
    this.get(this.url + "?store_name=" + value);
  }

  navigate(id: string) {
    this.router.navigate([`/giochishop/${id}`]);
  }
}
//<!-- funziona-->