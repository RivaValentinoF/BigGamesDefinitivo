import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aggiuntanegozi',
  templateUrl: './aggiuntanegozi.component.html',
  styleUrls: ['./aggiuntanegozi.component.css']
})
export class AggiuntanegoziComponent {
  
  addShopForm!: FormGroup;
  
  
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {

    

    
    this.addShopForm = this.fb.group({
      phone: ["", [Validators.required]],
      via: ["", [Validators.required]],
      city: ["", [Validators.required]]
    });
  }

  onShopCreate() {
    // Crea l'oggetto che in seguito va inserito nell'intestazione della richiesta
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      phone: this.addShopForm.value.phone,
      via: this.addShopForm.value.via,
      city: this.addShopForm.value.city
      
    })

    // Esegue la richiesta non tipizzata
    this.http.post("https://3000-nabb0-biggamesdefiniti-9svr7htmfu1.ws-eu83.gitpod.io/aggiuntanegozi", '', {
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