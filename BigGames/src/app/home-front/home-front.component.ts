import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.css']
})
export class HomeFrontComponent implements OnInit {
  username: string | null = null;

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.username = this.storage.getData('nome');
  }

  logOut() {
    this.storage.clearData()
    window.location.reload()
  }
}

