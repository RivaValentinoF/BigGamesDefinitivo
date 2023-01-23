import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicercashopComponent } from './ricercashop/ricercashop.component';
import { RouterModule,Routes } from '@angular/router';
import { GiochishopComponent } from './giochishop/giochishop.component';
import { AggiuntagiochiComponent } from './aggiuntagiochi/aggiuntagiochi.component';
import { HomeFrontComponent } from './home-front/home-front.component';
import { AggiuntanegoziComponent } from './aggiuntanegozi/aggiuntanegozi.component';
import { ContattaciComponent } from './contattaci/contattaci.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { LoginComponent } from './login/login.component';
import { CercaComponent } from './cerca/cerca.component';
import { InfogiochiComponent } from './infogiochi/infogiochi.component';

const routes: Routes = [
  { path: 'negozio', component:  RicercashopComponent},
  { path: 'giochishop/:id', component:  GiochishopComponent },
  { path: 'aggiuntagiochi', component:  AggiuntagiochiComponent },
  { path: '', component:  HomeFrontComponent },
  { path: 'aggiuntanegozi', component: AggiuntanegoziComponent  },
  { path: 'contattaci', component: ContattaciComponent   },
  { path: 'registrazione', component: RegistrazioneComponent   },
  { path: 'login', component: LoginComponent   },
  { path: 'cerca', component: CercaComponent   },
  {path:'infogiochi/:game',component:InfogiochiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }