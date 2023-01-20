import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {

  addRegistrazione!: FormGroup;


  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {

    

    
    this.addRegistrazione = this.fb.group({
      nome: ["", [Validators.required]],
      cognome: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      email: ["", [Validators.required]], 
      password: ["", [Validators.required]],
      via: ["", [Validators.required]],
      citta: ["", [Validators.required]],
      zip: ["", [Validators.required]]
    });
  }

  onShopCreate() {
    // Crea l'oggetto che in seguito va inserito nell'intestazione della richiesta
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      nome: this.addRegistrazione.value.nome,
      cognome: this.addRegistrazione.value.cognome,
      telefono: this.addRegistrazione.value.telefono,
      email: this.addRegistrazione.value.email,
      password: this.addRegistrazione.value.password,
      via: this.addRegistrazione.value.via,
      citta: this.addRegistrazione.value.citta,
      zip: this.addRegistrazione.value.zip
     
      
      
    })

    // Esegue la richiesta non tipizzata
    this.http.post("https://3000-nabb0-biggamesdefiniti-9svr7htmfu1.ws-eu83.gitpod.io/registrazione", '', {
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
//<!-- leggere html -->


