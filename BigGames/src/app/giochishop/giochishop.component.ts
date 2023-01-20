import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-giochishop',
  templateUrl: './giochishop.component.html',
  styleUrls: ['./giochishop.component.css']
})
export class GiochishopComponent implements OnInit  {
  
  GiochiLoc! : any;
  url : string = 'https://3000-nabb0-biggamesdefiniti-9svr7htmfu1.ws-eu83.gitpod.io/giochishop/'
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