import { Injectable } from '@angular/core';
import { CanActivate,  } from '@angular/router';
import { Observable } from 'rxjs';


/*-------------Conectar Servicio-------------*/
import { MusicaService } from '../servicios/musica.service';


/*----------navegar ruta----------*/
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private conectarServicio:MusicaService, private usarRuta:Router ){

  }

  canActivate(): boolean  {
      
      if( this.conectarServicio.validadoToken() == true ){
      
        return true;
      
      }else{

        return false;
        this.usarRuta.navigate( ['/login'] );
        
      }
    
  return true
  
  }
  
}
