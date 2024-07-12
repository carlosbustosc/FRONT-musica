import { Component, OnInit } from '@angular/core';

/*---insertar form group---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*---conectar servicio---*/
import { MusicaService } from 'src/app/servicios/musica.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  infoLogin:FormGroup;

  constructor(private fb: FormBuilder, private conectarServicio:MusicaService){
    
    this.infoLogin = this.fb.group({
        
      email: ['', Validators.required ],
      contrasena: ['', Validators.required ]

    })

  }

  ngOnInit(): void {
  }


  get validarEmail(){
        
    return this.infoLogin.controls['email'].invalid  &&  this.infoLogin.controls['email'].touched;
  }

   get ValidarPass(){
      
    return this.infoLogin.controls['contrasena'].invalid   &&  this.infoLogin.controls['contrasena'].touched;
  }


  ingresarLogin(){
    
     if( this.infoLogin.invalid ){
      
   

      Object.values( this.infoLogin.controls ).forEach( valores => {
           valores.markAsTouched();
      })


     }else{
        
        this.conectarServicio.Login( this.infoLogin )

            .subscribe( (resp:any) => {

                console.log( resp );

            }, (err => {
              
              console.log( err.error.error.message );

              if( err.error.error.message == "INVALID_PASSWORD" ){
                
                alert( "La contraseña no es valida" );
              }

              if( err.error.error.message == "EMAIL_NOT_FOUND" ){

                alert("El correo no esta registrado");
                
              }

            }))

     }

  }

}
