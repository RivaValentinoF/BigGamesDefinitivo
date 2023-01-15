import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiochishopComponent } from './giochishop/giochishop.component';
import { AppRoutingModule } from './app-routing.module';
import { RicercashopComponent } from './ricercashop/ricercashop.component';
import { AggiuntagiochiComponent } from './aggiuntagiochi/aggiuntagiochi.component';
import { HomeFrontComponent } from './home-front/home-front.component';



@NgModule({
  declarations: [
    AppComponent,
    GiochishopComponent,
    RicercashopComponent,
    AggiuntagiochiComponent,
    HomeFrontComponent,
    FormsModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }