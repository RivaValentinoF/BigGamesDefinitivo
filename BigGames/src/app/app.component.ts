import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BigGames';
  obs! : Observable<any>;
  datiDb!:any;
  constructor(private http : HttpClient)
  {
    this.obs  = this.http.get("https://3000-nabb0-biggamesdefiniti-20skp210dz8.ws-eu77.gitpod.io/")
    this.obs.subscribe(this.getData)
  }

   getData = (data :any)=>
   {
      console.log (data);
      this.datiDb = data;
   } 
}
