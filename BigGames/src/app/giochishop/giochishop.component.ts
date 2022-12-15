import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giochishop',
  templateUrl: './giochishop.component.html',
  styleUrls: ['./giochishop.component.css']
})
export class GiochishopComponent implements OnInit  {
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
  }


}
