import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/loginData.model';
import { StorageService } from 'src/services/storage.service';
// import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;
  statusCode!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    //private manager: ManagerService
  ) { }

  ngOnInit(): void {
    // Controllo se l'utente ha gia' eseguito il login
    if (this.storage.getData('id') != null) this.router.navigate(['']);

    // Inizializzo la form
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  submit() {
    // Creo l'oggetto che verra' inviaro al server Flask con le credenziali delll'utente
    let body: HttpParams = new HttpParams().appendAll({
      'email': this.form.value.email,
      'password': this.form.value.password
    });

    // Eseguo la richiesta in POST
    this.http.post<Data>('https://3000-nabb0-biggamesdefiniti-66oeafsk7s6.ws-eu83.gitpod.io/login', '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      // Aspetto la risposta del server e comunico all'utente la risposta
      if (data.statusCode == 200) {
        this.storage.saveData('id', data.data.id_buyer.toString())
        this.storage.saveData('email', data.data.email)
        this.storage.saveData('nome', data.data.nome)
        // Invio le informazioni dell'utente alle pagine in ascolto
        //this.manager.setUser(data.data);

        // Reindirizzo l'utente alla sua dashboard
        this.router.navigate(['']);
      } else {
        this.statusCode = data.statusCode;
        this.errorMessage = data.errorMessage;
      }
    });
  }

}