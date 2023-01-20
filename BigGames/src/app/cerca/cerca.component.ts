import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent {
  
  
  GiochiLoc : any= [];
  loading!: Boolean;
  url : string = 'https://3000-nabb0-biggamesdefiniti-9svr7htmfu1.ws-eu83.gitpod.io/cerca'
  ob!:Observable<object>;
  router: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.get(this.url)
  }
  get(url: string): void {
    this.loading = true;
    this.http.get(url).subscribe(data => {
      this.GiochiLoc = data;
      console.log(data)
      this.loading = false;
    });
  }

  

  onKey(value: string) {
    this.get(this.url + "?nome=" + value);
  }

}

  




//<!-- funziona-->
