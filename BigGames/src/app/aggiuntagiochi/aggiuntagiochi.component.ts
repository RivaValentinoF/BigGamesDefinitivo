import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aggiuntagiochi',
  templateUrl: './aggiuntagiochi.component.html',
  styleUrls: ['./aggiuntagiochi.component.css']
})
export class AggiuntagiochiComponent {
  constructor(private http: HttpClient) {
    console.log(document.getElementById('Nome_Gioco')); //funziona ma probabile nel posto sbagliato
  }
  sendDataToDB() {
    const data = {
      key1: document.getElementById('Nome_Gioco'),
      
    };
    this.http.post('https://3000-nabb0-biggamesdefiniti-7vwbfyn4g0k.ws-eu82.gitpod.io/aggiuntagiochi', data)
    .subscribe(response => {
      console.log(response);
    });
  }

}
