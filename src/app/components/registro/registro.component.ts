import { Component, OnInit } from '@angular/core';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";


/*-----conectar servicio-----*/
import { MusicaService } from 'src/app/servicios/musica.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  informacionRegistro:FormGroup;

  constructor( private conectarServicio:MusicaService,  private fb:FormBuilder ){
      
    this.informacionRegistro = this.fb.group({
        
      nombre:['',  [ Validators.required, Validators.maxLength(20)] ],
      correo:['',  Validators.required ],
      pass:  ['',  Validators.required ],
      pass2: ['',  Validators.required ]

    })

  }


  ngOnInit(): void {
    
  }


  get ValidarNombre(){
      
    return this.informacionRegistro.controls['nombre'].invalid && this.informacionRegistro.controls['nombre'].touched;
  }

   get ValidarCorreo(){
  
    return this.informacionRegistro.controls['correo'].invalid && this.informacionRegistro.controls['correo'].touched;

  }

  get ValidarPass(){

    return this.informacionRegistro.controls['pass'].invalid && this.informacionRegistro.controls['pass'].touched;
  }

  get ValidarPass2(){
    
    var pass1 = this.informacionRegistro.controls['pass'].value;
    var pass2 = this.informacionRegistro.controls['pass2'].value;
    
    if( pass1 === pass2 ){

      return false;/*---no mostrar mesnaje--*/

    }else{

      return true;/*---mostrar mensaje--*/
    }

  }




  enviarRegistro(){
    
    if( this.informacionRegistro.invalid ){
      
      console.log( this.informacionRegistro);

      Object.values( this.informacionRegistro.controls ).forEach( valor => {
            
        valor.markAsTouched();
      
      })

      
    }else{

      this.conectarServicio.registrarUsuario( this.informacionRegistro )
          .subscribe( resp => {

            console.log(resp);

            /*---se registro correctamente--*/
            alert("se registro correctamente");
            this.informacionRegistro.reset();

          
          }, (err => {
              
            
            alert( err.error.error.message );

            if( err.error.error.message ===  ""){

              alert("el email ya existe");

            }

            if( err.error.error.message === "WEAK_PASSWORD" ){

              alert(" el pasword debe tener minimo 6 carcateres")
            
            }
          

          }))


      console.log( this.informacionRegistro.value.nombre );
      console.log( this.informacionRegistro.value.correo );
      console.log( this.informacionRegistro.value.pass );
      console.log( this.informacionRegistro.value.pass2 );


    }

  }

    
}


