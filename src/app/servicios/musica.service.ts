/*---token automatico github------*/
/*----https://github.com/Klerith/spotify-get-token/blob/master/server/server.js----*/


 /*--------direccion URL archivo ServiceWorker.js---------
 https://www.eltiempo.com/infografias/2017/server.js
 -------*/



 /*----POSTMAN----*/
 /*--https://winter-resonance-930297.postman.co/workspace/Paises~f8dd6419-a0f1-43ec-b2eb-a0a147330865/request/create?requestId=d9652f09-2e76-4d22-8de1-f978c3a761af-----*/


 /*-----firebase
 https://firebase.google.com/docs/reference/rest/auth?hl=es-419#section-create-email-password
 ----------*/


import { Injectable, OnInit } from '@angular/core';

/*----httpclient---*/
import { HttpClient, HttpHeaders } from "@angular/common/http"

/*----utilizar operador map---*/
import { map } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class MusicaService{
  
  guardarToken:any = "";
  leerToken:any = "";

  tokenAuto:any;

  constructor(private http:HttpClient ) {

    this.leerTokenAlCargar()
    this.tokenAutomatico()
  }
  


    tokenAutomatico(){
        
      console.log("hola")

      const client_id     = "8a6109247b8149bda5f1aa05c76ea782";
      const client_secret = "f630cd9eb8d146f5a74ec228ecb59758"
      
  
    return this.http.get(`https://back-spoty.onrender.com/spotify/${ client_id }/${ client_secret }`)
          .pipe(
            map( (resp:any) => {

              this.tokenAuto = resp.body.access_token
              localStorage.setItem('token', this.tokenAuto)
              
              console.log(this.tokenAuto)
              return this.tokenAuto
              

            })
          )

    }

    
      


      getAlbunes( ){
          
     
      const headers = new HttpHeaders({

        "Authorization": `Bearer ${ localStorage.getItem('token') }`

      })
      
     console.log(headers)
    

      return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=50', { headers } )
                      .pipe(
                        map( (data:any) => {
                          return data.albums.items
                        })
                      )
        
  
    }


    
  
    
    /*---id del album--*/
    obtenerUnArtista( id:string ){
      
      const headers = new HttpHeaders({

        "Authorization": `Bearer ${ localStorage.getItem('token') }`

      })

      return this.http.get( `https://api.spotify.com/v1/artists/${ id }`, { headers } )
    

    }




    /*---canciones artista--*/
    obtenerTracks( id:string ){
      
      const headers = new HttpHeaders({

        "Authorization": `Bearer ${ localStorage.getItem('token') }`

      })

      
      return this.http.get(`https://api.spotify.com/v1/artists/${ id }/top-tracks?market=es`, { headers } )
                      .pipe(
                        map( (resp:any) => {
                          return resp.tracks
                        } )
                      )

    }





    /*-----buscador-----*/
    BuscarUnArtistas( nombre:string ){
      
      const headers = new HttpHeaders({

       "Authorization": `Bearer ${ localStorage.getItem('token') }`

      })

      return this.http.get(`https://api.spotify.com/v1/search?query=${ nombre }&type=artist&locale=es-419%2Ces%3Bq%3D0.9&offset=0&limit=10`, { headers })
      .pipe(
        map( (resp:any) => {
          
          return resp.artists.items

        })
      )
    }


    /*-----registro----*/
    registrarUsuario( formulario:any ){
    
    const registro = {

      email      : formulario.controls.correo.value,
      password   : formulario.controls.pass.value,
      returnSecureToken : true,

    }

     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNliPGHjwkjbu6iS10ZWQvsdD2ftf7Muw`,  registro  );

    }


    /*-----------------------LOGIN-----------------------*/

    Login( login:any ){

      const Login = {
        
        email : login.controls.email.value,
        password : login.controls.contrasena.value,
        returnSecureToken: true
      }

      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNliPGHjwkjbu6iS10ZWQvsdD2ftf7Muw', Login)
      .pipe(
        map( (resp:any) => {

          this.guardarToken = resp.idToken;
          console.log(this.guardarToken);


          this.guardarTokenStorage(this.guardarToken);
        
        })
      
      )

    }



    guardarTokenStorage( token:any ){

      localStorage.setItem('Token', this.guardarToken);
    }


    leerTokenAlCargar(){
  
      localStorage.getItem('Token');
      
      this.leerToken = localStorage.getItem('Token');

      console.log("Leyendo Tokennn:  " + this.leerToken);
    
    }


    validadoToken(){
      
      return this.guardarToken > 0;

    }

}

