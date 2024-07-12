import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*---httpclient module--*/
import { HttpClientModule } from "@angular/common/http";
import { ArtistasComponent } from './components/artistas/artistas.component';
import { AlbunesComponent } from './components/albunes/albunes.component';

import { HeaderComponent } from './navbar/header/header.component';

/*---importar PIPE----*/
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { BuscarComponent } from './components/buscar/buscar.component';

/*--------formularios--------*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';








@NgModule({
  declarations: [
    AppComponent,
    ArtistasComponent,
    AlbunesComponent,
    NoimagePipe,
    HeaderComponent,
    DomseguroPipe,
    BuscarComponent,
    RegistroComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
