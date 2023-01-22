import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiochishopComponent } from './giochishop/giochishop.component';
import { AppRoutingModule } from './app-routing.module';
import { RicercashopComponent } from './ricercashop/ricercashop.component';
import { AggiuntagiochiComponent } from './aggiuntagiochi/aggiuntagiochi.component';
import { HomeFrontComponent } from './home-front/home-front.component';
import { AggiuntanegoziComponent } from './aggiuntanegozi/aggiuntanegozi.component';
import { ContattaciComponent } from './contattaci/contattaci.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
//import { LoginComponent } from './login/login.component';
import { CercaComponent } from './cerca/cerca.component';
import { InfogiochiComponent } from './infogiochi/infogiochi.component';



@NgModule({
  declarations: [
    AppComponent,
    GiochishopComponent,
    RicercashopComponent,
    AggiuntagiochiComponent,
    HomeFrontComponent,
    AggiuntanegoziComponent,
    ContattaciComponent,
    RegistrazioneComponent,
    //LoginComponent,
    CercaComponent,
    InfogiochiComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }