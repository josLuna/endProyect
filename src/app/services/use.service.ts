import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { asyncScheduler, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UseService {
  sumLadosServ: any = []
  array1: any = {}
  useToggle: boolean
  getPdf1: any[]
  idCal: any
  date: any
  todo:any[]
  name: string
  nameCal: string
  confirmacion: boolean
  calle: string
  nuDom: number
  IuDom: number
  colonia: string
  tipCliente: string
  id: any
  userNew: boolean = false
  mail: string
  userName: string
  contactUser: any[]
  getCli: []
  getCostos: {}
  contactosUser: {}
  clienteC: any[]
  nuevoContacto: {}
  status: string
  idCli: any
  useArea: any
  mescla1: number
  costo1: number
  rendimiento1: number
  mescla: number
  costo: number
  rendimiento: number
  nombre1: string
  calle1: string
  colonia1: string
  date1: any
  nuDom1: number
  iuDum1: any
  o: number = 0
  iL: number = 0
  nomArr: any []
  data : any
  results:any
  susses:boolean
  costosVal:boolean
  msgCon:boolean = false
  constructor(private http: HttpClient, private miRouter: Router,
    public Alerta: AlertController, private toastController: ToastController) {
    this.status = localStorage.getItem('status')
    this.contactUser = []
    this.useArea = []
    this.todo= []
    this.userNew
    this.contactosUser = {}
    this.clienteC = []
    this.nuevoContacto = {}
    this.getCli = []
    this.getCostos = {}
    this.getProducto()
    this.nomArr = []
    this.susses= true
    this.costosVal = false
    //this.getContacto()
    //this.getClients()
    this.getClients().subscribe(
      (respuesta)=>{
        this.nombres(respuesta)
      }
    );
    this.array1 = {
      costo: 20,
      mescla: 4,
      rendimiento: 3,
      costo1: 20,
      mescla1: 4,
      rendimiento1: 3,
    }
    
  }
  getContacto() {
    this.http.get('https://node-esqueleto-production.up.railway.app/api/users/getUsers').subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.contactosUser = res
        console.log(this.contactosUser)
      },
      err => {
        //aquí entra si es un error
        this.contactosUser = []
        console.log(err)

      })
  }
  putContacto(usuario) {
    this.nomArr = []
    console.log(usuario)
    this.http.put('https://node-esqueleto-production.up.railway.app/api/users/updateClient', usuario).subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        //this.contactosUser = res
        this.getClients().subscribe(
          (respuesta)=>{
            this.nombres(respuesta)
          }
        );
      },
      err => {
        //aquí entra si es un error
        //this.contactosUser = []
        console.log(err)

      })
  }
  /*getClients() {
    this.http.get('https://db-fum1.herokuapp.com/api/users/getClients').subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.getCli = res
        console.log(this.getCli)
      },
      err => {
        //aquí entra si es un error
        this.getCli = []
        console.log(err)

      })
  }*/
  getClients() {
    this.nomArr.push()
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get <any>(
        'https://node-esqueleto-production.up.railway.app/api/users/getClients',
        httpOptions
      )
      .pipe(catchError((e) => 'e'));
  }
  nombres(res:any){
    this.status = localStorage.getItem('status')
    if(res.length==0){
      this.susses = false
      this.AlertaPequeña('Halgo salio mal!!','bottom')
    }else{
      if(this.status=='true'){
        this.getCli = res
        for (let i = 0; i < this.getCli.length; i++) {
          if(this.getCli[i]['name'] != 'e'){
            this.msgCon = false
            this.nomArr.push({nombre:this.getCli[i]['name'],_id:this.getCli[i]['_id']})
          }else{
            this.msgCon = true
            console.log(this.msgCon)
            this.susses = false
            this.AlertaPequeña('Error en la consulta!!','top')
          }
          
        }
        
        this.data = this.nomArr
        this.results = this.data;
      }else{
        console.log(this.status)
        this.getCli = []
        this.results = []
      }
    }
  }
  getProducto() {
    this.http.get('https://node-esqueleto-production.up.railway.app/api/costos/getCostos').subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.getCostos = res
        console.log(this.getCostos)
      },
      err => {
        //aquí entra si es un error
        this.getCostos = []
        console.log(err)
      })
  }
  getPdf() {
    this.http.get('https://node-esqueleto-production.up.railway.app/api/repdf/getpdf').subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.getPdf1 = res

        console.log(this.getPdf1)
      },
      err => {
        //aquí entra si es un error
        this.getPdf1 = []
        console.log(err)

      })
  }
  getContacto1(usuario) {


    this.http.post('https://node-esqueleto-production.up.railway.app/api/users/postUs', usuario).subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.contactosUser = res
        console.log(this.contactosUser)
      },
      err => {
        //aquí entra si es un error
        this.contactosUser = []
        console.log(err)

      })
  }
  getArea(id) {
    let Id = {
      idCli: id
    }
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'https://node-esqueleto-production.up.railway.app/api/areas/getArea',
        Id,
        httpOptions
      )
      .pipe(catchError((e) => 'error'));

    /*const usedata = fetch(`https://db-fum1.herokuapp.com/api/areas/getArea1/`+id).then(res => res)
    .then(data=> console.log(data))*/
    //this.useArea = await this.http.post('https://db-fum1.herokuapp.com/api/areas/getArea',Id).toPromise()

    /*promises.then((data)=>{
      this.useArea = [data]
      console.log(data)
    })
    .catch((error)=>{
      console.log(error)
    })*/
    //return this.useArea
    /*.subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.useArea = res
        console.log(this.useArea)
      },
      err => {
        //aquí entra si es un error
        this.useArea = []
        console.log(err)

      })*/

  }
  postClients(contactUser) {
    this.nomArr = []
    this.http.post('https://node-esqueleto-production.up.railway.app/api/users/postClients', contactUser).subscribe(
      (res: any) => {
        this.getClients().subscribe(
          (respuesta)=>{
            this.nombres(respuesta)
          }
        );
        this.contactUser = []
      },
      err => {

      }
    )
  }
  postArch(datos) {
    let dato = {
      idCli: datos.id,
      nombre: datos.nombre,
      areas: datos.Areas,
      total: datos.total,
    }
    console.log(dato)
    this.http.post('https://node-esqueleto-production.up.railway.app/api/areas/postArea', dato).subscribe(
      (res: any) => {
        this.susses = true
        this.AlertaPequeña('Exito! \n Se guardo la información!','top')
        //this.showAlert('Se guardaron de forma exitosa!!','¡¡Exitoso!!')
        this.contactUser = []
      },
      err => {

      }
    )
  }
  login(datos) {
    let usuario = {
      name: datos.name,
      password: datos.password
    }
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'https://node-esqueleto-production.up.railway.app/api/users/getUser',
        usuario,
        httpOptions
      )
      .pipe(catchError((e) => 'error'));
  }
  delCli(id) {
    this.nomArr = []
    let body = {
      _id: id
    }
    console.log(id)

    this.http.post('https://node-esqueleto-production.up.railway.app/api/users/deleteClient', body).subscribe(
      (res: any) => {
        //this.nomArr = []
        this.getClients().subscribe(
          (respuesta)=>{
            this.nombres(respuesta)
          }
        );
        this.susses = true
        this.delArea(id)
        this.AlertaPequeña('Se elimino un cliente','top')
      },
      err => {
        
      }
    )
  }
  delArea(id) {
    let Area = {
      idCli: id
    }
    console.log(Area)

    this.http.post('https://node-esqueleto-production.up.railway.app/api/areas/deleteAreas', Area).subscribe(
      (res: any) => {
        //this.AlertaPequeña('Se elimino un cliente','bottom')
      },
      err => {
        
      }
    )
  }
  putArea(Areas) {
    this.nomArr = []
    this.http.put('https://node-esqueleto-production.up.railway.app/api/areas/putArea', Areas).subscribe(
      (res: any) => {
        //Aquí solo entra si la llamada es exitosa.
        this.getArea(Areas.idCli).subscribe(
          (respuesta) => {
            this.UseArea(respuesta)
          }
        )
        //console.log(Areas)
      },
      err => {
        //aquí entra si es un error
        //this.contactosUser = []
        console.log('Error Areas:')
        console.log(Areas)
        console.log(err)

      })
  }
  /* agregarEmpresa(){
     let nuevaEmpresa = {
       nombre:this.nombre,
       calle: this.calle,
       nuDom:this.nuDom,
       tipCliente:this.tipCliente
     }
 
     this.http.post('http://localhost:3000/api/empresas/setEmpresa',nuevaEmpresa).subscribe(
     (res:any)=>{
       this.getContacto()
     },
     err=>{
 
     }
     )
 
     this.nombre = this.calle = this.tipCliente = ''
     this.nuDom =  0
   }
   getEmpresa(idE){
     
     console.log('--IDDEE',idE)
     let body={
       id:idE,
     }
     this.http.post('http://localhost:3000/api/empresas/getEmpr',body).subscribe(
       (res:any) => {
       //Aquí solo entra si la llamada es exitosa.
       this.nuevoContacto = res
 
       console.log(this.nuevoContacto)
     }, 
     err => {
       //aquí entra si es un error
       this.nuevoContacto = []
       console.log(err)
 
 
     })
   }
   putEmpresa(idEm){
    
     let body = {
       id: idEm,
       nombre:this.nombre,
       calle: this.calle,
       nuDom:this.nuDom,
       tipCliente:this.tipCliente
     }
     console.log(body)
     this.http.put('http://localhost:3000/api/empresas/putEmpresa',body).subscribe(
       (res:any) => {
     },
     err => {
       //aquí entra si es un error
       this.nuevoContacto = {}
       console.log(err)
 
     })
 
   }
 
   deleteEmpresa(idEm){
     let body = {
       id:idEm
     }
     
     this.http.post('http://localhost:3000/api/empresas/deleteEmpresa',body).subscribe(
     (res:any)=>{
       this.getContacto()
     },
     err=>{
 
     }
     )
   }*/

  guardarCliente() {
    // Creamos array con los meses del año
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Creamos el objeto fecha instanciándolo con la clase Date
    const fecha = new Date();
    // Construimos el formato de salida
    this.date = fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear()
    console.log(this.date)
    if (this.calle != null && this.name != null && this.nuDom != null && this.colonia != null) {
      let contacto1 = {
        name: this.name,
        calle: this.calle,
        nuDom: this.nuDom,
        IuDom: this.IuDom,
        colonia: this.colonia,
        date: this.date,
      }


      this.status = localStorage.getItem('status')
      if (this.status == 'true' ) {
        if(this.msgCon){
          this.contactUser.push(contacto1)
        }else{
          console.log(this.msgCon)
          this.postClients(contacto1)
        }
        

      } else {
        //this.clienteC.push(contacto1)
        this.contactUser.push(contacto1)
      }
      this.miRouter.navigate(['tabs/tab2'])
      this.name = null
      this.calle = null
      this.nuDom = null
      this.IuDom = null
      this.colonia = null
      this.date = null
    } else {
      this.showAlert('Verifica que ningun dato este vasio', 'ERROR!!')
    }

  }
  async showAlert(msg, header) {
    const instanciaAlerta = await this.Alerta.create({
      header: header,
      subHeader: msg,
      buttons: ['cerrar']
    });

    await instanciaAlerta.present()
  }


  calculadora(index, id, name) {
    this.costos()
    this.idCal = id
    this.nameCal = name
    //console.log(this.idCal)
    if(this.useArea.length == 0){
      this.getArea(id).subscribe(
        (respuesta) => {
          this.UseArea(respuesta)
        }
      )
    }else{
      this.useArea = []
      this.getArea(id).subscribe(
        (respuesta) => {
          this.UseArea(respuesta)
        }
      )
    }
   
    this.miRouter.navigate(['tabs', 'tab4'])
  }
  UseArea(res: any) {
    if (res.length == 0 || res == 'error') {
      //this.showAlert('Checa Tu conexion de red', 'ERROR!!')
      this.iL = 0
    } else {
      this.useArea = res
      for (let i = 0; i < this.useArea.length; i++) {
        this.iL = this.iL + 1
      }
      console.log(this.useArea)
    }
  }
  Cancelar() {
    this.idCal = null
    this.nameCal = null
    this.iL = 0
    this.miRouter.navigate(['tabs', 'tab2'])

  }

  costos() {

    if (this.status == 'true') {
      if(this.costosVal == false){
      this.costo = null
      this.mescla = null
      this.rendimiento = null
      this.costo1 = null
      this.mescla1 = null
      this.rendimiento1 = null
      this.costo = this.getCostos['0']['postConstrucion']['costo']
      this.mescla = this.getCostos['0']['postConstrucion']['mescla']
      this.rendimiento = this.getCostos['0']['postConstrucion']['rendimiento']
      this.costo1 = this.getCostos['0']['preConstrucion']['costo']
      this.mescla1 = this.getCostos['0']['preConstrucion']['mescla']
      this.rendimiento1 = this.getCostos['0']['preConstrucion']['rendimiento']
      }
      
    } else {

      this.costo = null
      this.mescla = null
      this.rendimiento = null
      this.costo1 = null
      this.mescla1 = null
      this.rendimiento1 = null

      this.costo = this.array1.costo
      this.mescla = this.array1.mescla
      this.rendimiento = this.array1.rendimiento
      this.costo1 = this.array1.costo1
      this.mescla1 = this.array1.mescla1
      this.rendimiento1 = this.array1.rendimiento1

    }

  }
  async suss(Comentario,position){
    const toast = await this.toastController.create({
      message: Comentario,
      duration: 1500,
      position: position,
      cssClass:'custom-Alerta',
    });
    await toast.present();
  }
  async denger(Comentario,position){
    const toast = await this.toastController.create({
      message: Comentario,
      duration: 1500,
      position: position,
      cssClass:'custom-AlertaError',
    });
    await toast.present();
  }
 AlertaPequeña(Comentario,position){
    this.status = localStorage.getItem('status')
    if(this.status == 'true'){
      if(this.susses == true){
        this.suss(Comentario,position)
      }else{
        this.denger(Comentario,position)
      }
    }else{
      if(this.susses == true){
        this.suss(Comentario,position)
      }else{
        this.denger(Comentario,position)
      }
    }
   
  }
  buscar(id) {
    if (this.status == 'true') {
      for (let i = 0; i < this.getCli.length; i++) {
        if (id == this.getCli[i]['_id']) {
          this.nombre1 = this.getCli[i]['name']
          this.calle1 = this.getCli[i]['calle']
          this.colonia1 = this.getCli[i]['colonia']
          this.date1 = this.getCli[i]['date']
          this.nuDom1 = this.getCli[i]['nuDom']
          this.iuDum1 = this.getCli[i]['IuDom']
        }
      }
    } else {

      for (let i = 0; i < this.contactUser.length; i++) {
        if (id == this.contactUser[i]['_id']) {

          this.calle1 = this.contactUser[i]['calle']
          this.colonia1 = this.contactUser[i]['colonia']
          this.date1 = this.contactUser[i]['date']
          this.nuDom1 = this.contactUser[i]['nuDom']
          this.iuDum1 = this.contactUser[i]['IuDom']
        }

      }
    }

  }
}
