import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/loginData.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storage.getData('id') != null) this.router.navigate([''])

    this.form = this.fb.group({

    });
  }

  submit() {
    var body = new HttpParams().appendAll({

    });

    this.http.post<Data>('', '', {}).subscribe(data => {
      if (data.statusCode == 200) {
        this.storage.saveData('id', data.data.id_buyer.toString());
        this.router.navigate(['']); // Dashboard utente
      } else {
        this.errorMessage = data.errorMessage
      }
    })
  }
}
//<!-- non funziona-->