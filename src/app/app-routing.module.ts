import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*---componentes----*/
import { ArtistasComponent } from './components/artistas/artistas.component'; 
import { AlbunesComponent } from './components/albunes/albunes.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';


/*-----------guard--------------*/
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  
  { path:"registro",     component:RegistroComponent  },
  { path:"login",        component: LoginComponent},
  { path:"albunes",      component: AlbunesComponent  },  // canActivate: [ AuthGuard ]
  { path:"artistas/:id", component: ArtistasComponent  }, // canActivate: [ AuthGuard ]
  { path:"buscar",       component:BuscarComponent },     // canActivate: [ AuthGuard ]
  { path:"**", pathMatch:"full", redirectTo:"albunes" }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
