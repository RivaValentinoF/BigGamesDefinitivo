import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicercashopComponent } from './ricercashop/ricercashop.component';
import { RouterModule,Routes } from '@angular/router';
import { GiochishopComponent } from './giochishop/giochishop.component';
import { AggiuntagiochiComponent } from './aggiuntagiochi/aggiuntagiochi.component';
import { HomeFrontComponent } from './home-front/home-front.component';
import { AggiuntanegoziComponent } from './aggiuntanegozi/aggiuntanegozi.component';

const routes: Routes = [
  { path: '', component:  RicercashopComponent},
  { path: 'giochishop/:id', component:  GiochishopComponent },
  { path: 'aggiuntagiochi', component:  AggiuntagiochiComponent },
  { path: 'home', component:  HomeFrontComponent },
  { path: 'aggiuntanegozi', component: AggiuntanegoziComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }