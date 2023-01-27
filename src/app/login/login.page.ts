import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UseService } from '../services/use.service';
import { LoadingController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    /*username:string = localStorage.getItem('name')
  password: any = localStorage.getItem('password')*/
  username: string
  password: any
  Token: string = localStorage.getItem('Token')
  alumno: any = {};
  usuarioInvalido: boolean=false;
  

  constructor(private miRouter: Router, private UseService: UseService,
    private loadingCtrl: LoadingController, private http: HttpClient) {
    this.username=null
    this.password=null
  }
  iniciarSesion(){
    let datos = {
      name:this.username,
      password: this.password
    }
    if (this.username != null && this.password != null){
      this.UseService.login(datos).subscribe(
        (respuesta)=>{
          this.login2(respuesta)
        }
      );
    }else{
      this.UseService.showAlert('Nombre o Contraseña esta vacios!!','ERROR')
    }
    
  }
  login2(res:any){
    if(res.length==0 || res=='error'){
      //this.usuarioInvalido=true;
      this.UseService.showAlert('¡¡Ususario ó Contraseña estan mal!!', 'ERROR!!')
      //console.log(res)
    }else{
      console.log( res['0']['Token'])
      localStorage.setItem('Token', res['0']['Token'])
      this.miRouter.navigate(['tabs', 'tab2'])
      //localStorage.setItem('alumno',JSON.stringify(res[0]));
      console.log(res)
    }
  }
  

  /*async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

  iniciarSesion() {
    this.showLoading()
    /**
     * hay que crear la conexion a base de datos
     
    let usuario = {
      name: this.username,
      password: this.password
    }
    

    if (this.username != null && this.password != null) {
       this.UseService.getContacto1(usuario)
      if (this.username == this.UseService.contactosUser['0']['name']) {
        localStorage.setItem('Token', this.UseService.contactosUser['0']['Token'])
          this.miRouter.navigate(['tabs', 'tab1'])
      } else {
        this.UseService.showAlert('Error en el Usuario ó Contraseña', 'ERROR!!')
      }
    } else {
      this.UseService.showAlert('Llena todos los campos vacios', 'ERROR!!')
    }


    /*localStorage.setItem('name',this.username)
    localStorage.setItem('password',this.password)
    //if(this.username=='' || this.password==''){
      if(this.username==localStorage.getItem('name')&&this.password== localStorage.getItem('password')){
        if(this.username=='' && this.password==''){
          
          this.UseService.showAlert('Llena todos los campos vacios','ERROR')
        }else{
          this.miRouter.navigate(['tabs', 'tab1'])
        }
      }else{
        
      }


    this.username = null
    this.password = null
  }*/


  ngOnInit() {
  }

}
