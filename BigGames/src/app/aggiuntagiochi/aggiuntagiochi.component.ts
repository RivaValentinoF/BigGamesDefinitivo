import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Genere } from 'src/models/genere.model';
import { Data } from 'src/models/richiestaGeneri&Console.model';


@Component({
  selector: 'app-aggiuntagiochi',
  templateUrl: './aggiuntagiochi.component.html',
  styleUrls: ['./aggiuntagiochi.component.css']
})


export class AggiuntagiochiComponent implements OnInit {
  addGameForm!: FormGroup;
  Generi: Genere[] = [];
  url: string = 'http://192.168.1.125:3000/aggiuntagiochi'
  ob!: Observable<object>;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.http.get<Data>(this.url).subscribe(data => {
      console.log(data)
      this.Generi = data.generi;
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
      genere: ["", [Validators.required]]
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
      genere: this.addGameForm.value.genere
    })

    // Esegue la richiesta non tipizzata
    this.http.post("http://192.168.1.125:3000/aggiuntagiochi", '', {
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
