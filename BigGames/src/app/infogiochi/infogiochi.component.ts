import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-infogiochi',
  templateUrl: './infogiochi.component.html',
  styleUrls: ['./infogiochi.component.css']
})
export class InfogiochiComponent implements OnInit{
  GiochiLoc! :any;
  url : string = 'https://3000-nabb0-biggamesdefiniti-z7tn19kr0a6.ws-eu83.gitpod.io/infogiochi<console>/<nome>'
  ob!:Observable<object>;
  route: any;

  constructor(private http: HttpClient){


  }



  ngOnInit(): void {
    this.ob = this.http.get(this.url)
    this.ob.subscribe(data => {
      this.GiochiLoc = data;
    });
  }
}
