import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-infogiochi',
  templateUrl: './infogiochi.component.html',
  styleUrls: ['./infogiochi.component.css']
})
export class InfogiochiComponent implements OnInit {
  GiochiLoc!: any;
  url: string = ''
  ob!: Observable<object>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private storage: StorageService) {
    this.route.params.subscribe(p => {
      const str = p['game'];
      const cons = str.split(",,")[0];
      const name = str.split(",,")[1];
      this.url = `https://3000-nabb0-biggamesdefiniti-66oeafsk7s6.ws-eu83.gitpod.io/infogiochi/${cons}/${name}`
      this.ob = this.http.get(this.url)
      this.ob.subscribe(data => {
        console.log(data);
        this.GiochiLoc = data;
      });
    })
  }

  send() {
    const nome = document.getElementById('nome');
    const gConsole = document.getElementById('console');
    const prezzo = document.getElementById('prezzo');
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      user_id: this.storage.getData('id')?.toString() || "",
      game_id: "",
      prezzo: prezzo?.innerText || ""
      
    })

    this.http.post("https://3000-nabb0-biggamesdefiniti-z7tn19kr0a6.ws-eu83.gitpod.io/wishlist", '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
  }
}
