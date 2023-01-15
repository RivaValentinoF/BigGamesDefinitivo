import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-aggiuntagiochi',
  templateUrl: './aggiuntagiochi.component.html',
  styleUrls: ['./aggiuntagiochi.component.css']
})


export class AggiuntagiochiComponent implements OnInit {
  addGameForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Crea la form
    /**!
     * Per collegare un 'input' HTLM alla form di Angular bisogna aggiungere 'formControlName' come  proprieta' dell'input e come valore il nome scielto in Angular
     */
    this.addGameForm = this.fb.group({
      gameName: ["", [Validators.required]],
      nameStudio: ["", [Validators.required]],
      gamePublish: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]]
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
      quantity: this.addGameForm.value.quantity
    })

    // Esegue la richiesta non tipizzata
    this.http.post("https://3000-nabb0-biggamesdefiniti-vh6aqwajw1x.ws-eu82.gitpod.io/aggiuntagiochi", '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);
    })
  }




  /**onProductCreate(products: {nome_gioco : string, nome_studio:string , data_uscita:string , prezzo : number , quantita : number})
  this.http.post()/*
   






   /**console.log(document.getElementById('Nome_Gioco')); //funziona ma probabile nel posto sbagliato
   }
   sendDataToDB() {
   const data = {
     key1: document.getElementById('Nome_Gioco'),
     
   };
   this.http.post('https://3000-nabb0-biggamesdefiniti-7vwbfyn4g0k.ws-eu82.gitpod.io/aggiuntagiochi', data)
   .subscribe(response => {
     console.log(response);
   });  
 }*/

}
