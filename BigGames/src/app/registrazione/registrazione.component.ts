import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {

  addUserForm!: FormGroup;


  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.addUserForm = this.fb.group({
      nome: ["", [Validators.required]],
      cognome: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      email: ["", [Validators.required]], 
      password: ["", [Validators.required]],
      via: ["", [Validators.required]],
      citta: ["", [Validators.required]],
      cap: ["", [Validators.required]]
    });
  }

  onUserCreate() {
    
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      nome: this.addUserForm.value.nome,
      cognome: this.addUserForm.value.cognome,
      telefono: this.addUserForm.value.telefono,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      via: this.addUserForm.value.via,
      citta: this.addUserForm.value.citta,
      cap: this.addUserForm.value.cap
    })

    
    this.http.post("https://3000-nabb0-biggamesdefiniti-z7tn19kr0a6.ws-eu83.gitpod.io/registrazione", '', {
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


