import { Component, OnInit } from '@angular/core';

/*---conectar servicios-----*/
import { MusicaService } from 'src/app/servicios/musica.service';


/*----usar ruta----*/
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  
  albunSlider:any = [];
  resultadoBusqueda:any = [];

  ocultarSlider:boolean = true;
  ocultarAlbunes:boolean = false;

  constructor(private conectarServicio:MusicaService, private usarRuta:Router ){

  }
  
  ngOnInit(): void {
    
    this.conectarServicio.tokenAutomatico().subscribe()

    
    /*-----traer ----*/
    this.conectarServicio.getAlbunes()
        .subscribe( resp => {
          console.log(resp);

          this.albunSlider = resp;

        })
      
  }


  /*--------input----------*/
  buscar( valor:string){
      
    console.log(valor.toLocaleLowerCase());
    
    this.conectarServicio.BuscarUnArtistas( valor )
        .subscribe( resp => {
          console.log( resp );

          this.resultadoBusqueda = resp;
          
        })

    this.ocultarSlider  = false;
    this.ocultarAlbunes = true;

    if(valor.length <= 0){

      this.ocultarSlider = true;
      this.ocultarAlbunes = false;
    }

  }




  /*------------click-----------*/
  idGrupo( id:string ){
  
    console.log(id);
    this.usarRuta.navigate( ['artistas', id] );
  }
  
}
