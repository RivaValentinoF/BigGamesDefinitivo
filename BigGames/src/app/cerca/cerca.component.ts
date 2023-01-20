import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent {
  GiochiLoc! : any;
  url : string = 'https://3000-nabb0-biggamesdefiniti-00rq49jt7ul.ws-eu83.gitpod.io/cerca'
  ob!:Observable<object>;

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);



    this.ob = this.http.get(this.url+id);
    this.ob.subscribe(data => {
      this.GiochiLoc = data;
    });

  }


}

// riadattare il codice 
