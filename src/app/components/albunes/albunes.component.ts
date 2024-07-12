import { Component, OnInit } from '@angular/core';

/*--------conectar servicio------*/
import { MusicaService } from 'src/app/servicios/musica.service';

/*----------usar ruta----------*/
import { Router } from "@angular/router"

@Component({
  selector: 'app-albunes',
  templateUrl: './albunes.component.html',
  styleUrls: ['./albunes.component.css']
})
export class AlbunesComponent implements OnInit{
  
  todosLosAlbunes:any = [];

  constructor(private usarRuta: Router, private conectarServicio: MusicaService){

  }

  ngOnInit(): void {
        
    this.conectarServicio.tokenAutomatico().subscribe()

    
    this.conectarServicio.getAlbunes()
        .subscribe( resp => {
          console.log(resp);

          this.todosLosAlbunes = resp;

        }, (error => {

          alert(error.error.error.message);
          
        }))

  }

  parametroID( id:any ){
        
    /*---console.log( id );---*/
    this.usarRuta.navigate(['/artistas', id ]);
    
  }

}
