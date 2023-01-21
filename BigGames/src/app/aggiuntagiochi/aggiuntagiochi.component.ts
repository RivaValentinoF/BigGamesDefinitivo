import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-aggiuntagiochi',
  templateUrl: './aggiuntagiochi.component.html',
  styleUrls: ['./aggiuntagiochi.component.css']
})


export class AggiuntagiochiComponent implements OnInit {
  addGameForm!: FormGroup;
  Generi! : any;
  url : string = 'https://3000-nabb0-biggamesdefiniti-r8hta9a99az.ws-eu83.gitpod.io/aggiuntagiochi'
  
  ob!:Observable<object>;
  
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.ob = this.http.get(this.url);
    this.ob.subscribe(data => {
      this.Generi = data;
    });

    
    
    
    
    
    // Crea la form
    /**!
     * Per collegare un 'input' HTLM alla form di Angular bisogna aggiungere 'formControlName' come  proprieta' dell'input e come valore il nome scielto in Angular
     */
    this.addGameForm = this.fb.group({
      gameName: ["", [Validators.required]],
      nameStudio: ["", [Validators.required]],
      gamePublish: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      console: ["", [Validators.required]],
      genre: ["", [Validators.required]]
    });
  }

  onProductCreate() {
    // Crea l'oggetto che in seguito va inserito nell'intestazione della richiesta
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      gameName: this.addGameForm.value.gameName,
      nameStudio: this.addGameForm.value.nameStudio,
      gamePublish: this.addGameForm.value.gamePublish,
      price: this.addGameForm.value.price,
      quantity: this.addGameForm.value.quantity,
      console: this.addGameForm.value.console,
      genre: this.addGameForm.value.genre
      
    })

    // Esegue la richiesta non tipizzata
    this.http.post("https://3000-nabb0-biggamesdefiniti-00rq49jt7ul.ws-eu83.gitpod.io/aggiuntagiochi", '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);
    })
  }

}
//<!-- funziona-->