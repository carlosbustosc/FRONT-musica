import { Component, OnInit } from '@angular/core';

/*------------conectar servicios----------*/
import { MusicaService } from "../../servicios/musica.service"


/*--------recibir parametro-----*/
import { ActivatedRoute, Router } from "@angular/router"


/*--------localicacion anterior---------*/
import { Location } from "@angular/common";



@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit{
  
  artista:any = { };
  todasLasCanciones:any = [];

  masAlbunes:any = [];



  constructor(private localizacion: Location , private usarRuta:Router, private recibirParametro: ActivatedRoute , private conectarServicios:MusicaService ){

  }


  /*----metodo artista----*/
  getArtista( id:any ){

    this.conectarServicios.obtenerUnArtista( id )
    .subscribe( (resp:any) => {
      console.log(resp)

      this.artista = resp;
    });
}


/*---------metodo canciones-----*/
getAcanciones( id:string ){

  this.conectarServicios.obtenerTracks( id )
            .subscribe( resp => {
              console.log( resp );
            this. todasLasCanciones = resp;

            })
}









   ngOnInit(): void {
  
    this.conectarServicios.tokenAutomatico().subscribe()



    this.recibirParametro.params.subscribe( resp => {
        console.log( resp['id'] );
          
        
        /*----conectar a un artista----*/
        this.getArtista( resp['id'] );
        this.getAcanciones( resp['id']);
        

        /*---------traer canciones--------*/

        


          /*----cargar nuevos albunes-----*/
          this.conectarServicios.getAlbunes()
              .subscribe( resp => {
                    this.masAlbunes = resp;
              })

    })
  }

  getID( id:string ){
    

    //contenedor mobile
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    
    if(mediaQuery.matches){
    

    //animar cajon 
    const cajonAlbunes:any = document.querySelector('.cortar_contenedor');
    cajonAlbunes.animate([
          { left: '0px' },
          { left: '-100%' }
      ], {
          duration: 1000, // Duración en milisegundos (1 segundo)
          fill: 'forwards' // Mantener el estado final de la animación
      });

    }



   

    this.getArtista( id );
    this.getAcanciones( id );
  }


  volver(){

     this.localizacion.back();
  }

  

  
}
