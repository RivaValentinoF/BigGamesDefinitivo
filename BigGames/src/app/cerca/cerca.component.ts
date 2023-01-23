import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent {
  
  
  GiochiLoc : any= [];
  loading!: Boolean;
  url : string = 'https://3000-nabb0-biggamesdefiniti-hgysb7pmp53.ws-eu83.gitpod.io/cerca'
  ob!:Observable<object>;
  //router: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.get(this.url)
  }
  get(url: string): void {
    this.loading = true;
    this.http.get(url).subscribe(data => {
      this.GiochiLoc = data;
      console.log(data)
      this.loading = false;
    });
  }

  

  onKey(value: string) {
    this.get(this.url + "?nome=" + value);
  }

  navigate(c:string,nome:string) {
    this.router.navigate([`/infogiochi/${c},,${nome}`]);
  }


}

  




