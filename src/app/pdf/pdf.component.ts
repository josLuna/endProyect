import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { timeStamp } from 'console';
import { totalmem } from 'os';
import { UseService } from '../services/use.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  todo:any [] = []
  handlerMessage = '';
  roleMessage = '';
  ladox: number
  index: number
  index2: number
  toggle: boolean = false
  toggle1: boolean
  resultado: number
  resultado1: number
  ladoNombre: string
  selList: string 
  mCuadra: number
  cu1: number = 0
  el1: number
  el2: number = 0
  el3: number = 0
  el4: number = 0
  el5: number = 0
  nR: number = 0
  mLin: number
  lados: any[]
  l: number = 0
  la: number = 0
  p: number
  u: string
  n: number
  m: number
  sumList: any
  sumLados: any []
  sumLados1: any []
  sumLados2: any
  sumLados3: any
  lado: boolean
  agregar : boolean = false
  check: boolean
  Me:any[] = []
  constructor(public Alerta: AlertController, private miRouter: Router, 
    private userService: UseService,private toastController: ToastController) {
     
    this.sumList = []
    this.sumLados = []
    this.sumLados1 = []
    this.sumLados2 = []
    this.sumLados3 = []
    this.toggle = false
    this.toggle1 = false
    this.n = 0
    this.lado = false
    this.ladoNombre = null
    this.el1 = 0
    this.p = 0
    this.check = false
    
    this.selList = null
  }
  checkF(){
    console.log(this.check)
    if(this.check == false){
      this.check = true
    }else{
      this.check = false
    }
  }
  sumLado() {
    if (this.ladox == null) {
      alert('Ingresa un numero')
    } else {
      if (this.index == null) {
        this.sumLados.push(this.ladox)
        //this.Me.push(this.ladox)
        this.sumLados1.push(this.ladox)
        this.ladox = null
      } else {
        this.sumLados.push(this.ladox)
        this.sumLados2.push(this.ladox)
        this.ladox = null
        //this.userService.AlertaPeque??a('Agregado','bottom')
      }
    }
  }
 cal(index) {
    if (this.sumList[index]['tog'] == false) {
      this.sumList[index]['sumLados'].forEach(element => {
        this.l = this.l + element
        console.log(element)
      })
      this.mLin = this.l
      this.resultado = (this.mLin) * 3.33
      this.resultado1 = (this.resultado) * this.userService.costo
      console.log(this.userService.costo)
      this.sumList[index]['result1'] = this.resultado1.toFixed()
      this.sumList[index]['mLineal'] = this.l
      this.sumList[index]['numCuar'] = this.selList
    } else {
      this.sumLados = this.sumList[index]['sumLados']
      this.sumLados.forEach(element => {
        this.l = this.l + element
        this.la = this.la + 1
      })
      this.case()
      console.log(this.la+' Este es el la')
      console.log(this.sumList)
      if(this.la==1){
        this.l = 0
      }
      this.resultado1 = (this.mLin) * this.userService.costo1
      this.sumList[index]['result1'] = this.resultado1.toFixed()
      this.sumList[index]['mLineal'] = this.l
      this.sumList[index]['mCu'] = this.mCuadra
      this.sumList[index]['numCuar'] = this.selList
    }
    this.calP()
    
   //this.showAlert('Se Modifico de marea correcta.', 'Exitoso!')
    this.selList = null
    this.l = null
    this.sumLados2 = []
    this.lado = false
    this.sumLados = []
    this.la = 0

  }

  calcular() {
    
    if (this.sumLados.length == 0 || this.selList == null) {
      if(this.sumLados.length==0){
        
        this.userService.AlertaPeque??a('Agrega una cantidad','top')
        //this.showAlert('Agrega los metros con el boton +Lados', 'Alerta!')
      }else{
        this.userService.susses = false
        this.userService.AlertaPeque??a('Escribe un nombre para el area','top')
        //this.showAlert('Agrega un nombre a esta Area!!!', 'Alerta!')
      }
    } else {
      if(this.userService.useArea.length  == 0){
          this.togleTrue()
          this.userService.useToggle = this.toggle
      }else{
        if(localStorage.getItem('status')=='true'){
          if ( this.agregar == true ){
            this.togleTrue()
            this.userService.useToggle = this.toggle
            
          } else{
            this.userService.showAlert('Este usurio ya tiene informaci??n!!\nSELECCIONA(Mostrar Areas)', '??Alerta!')
          }
        }else{
          this.togleTrue()
          this.userService.useToggle = this.toggle
        }
        
      }
      

    }
  }
  calP() {
    this.p = 0
    this.sumList.forEach(element => {
      this.m = parseInt(element.result1)
      this.p = (this.p + this.m)
    })
  }
  togleTrue() {

    this.sumLados.forEach(element => {
      this.l = this.l + element
      this.sumLados1 = []
      this.la = this.la + 1
    })
    this.calculos()

    if (this.toggle == false) {
     
      if(Math.round(parseInt(this.resultado.toFixed(1)))<this.resultado){
        console.log(this.resultado.toFixed(1)+ ' este s grande')
        this.resultado = Math.round(parseInt(this.resultado.toFixed(1)))+1
        this.resultado1 = this.resultado * this.userService.costo
      }else{
        this.resultado1 = (Math.round(parseInt(this.resultado.toFixed(1)))) * this.userService.costo
        console.log(Math.round(parseInt(this.resultado.toFixed(1))))
      }
      
      this.p = this.p + this.resultado1
      console.log(localStorage.getItem('status'))
      let newListCal = {
        numCuar: this.selList,
        mLineal: this.mLin,
        resultado: this.resultado,
        result1: this.resultado1,
        tog: this.toggle,
        u: 'post costruccion',
        sumLados: this.sumLados,
      }
      this.sumList.push(newListCal)
      this.userService.susses = true
      this.userService.AlertaPeque??a('Se a agregado un area','top')
      console.log(this.sumList)

    } else {
      console.log('entras a un false')
      if(this.la==1){
        this.mLin = 0
      }
      this.resultado1 = (this.mCuadra) * this.userService.costo1
      this.p = this.p + this.resultado1
      let newListCal = {
        numCuar: this.selList,
        mLineal: this.mLin,
        result1: this.resultado1,
        mCu: this.mCuadra,
        tog: this.toggle,
        u: 'Pre costruccion',
        sumLados: this.sumLados,
      }

      this.sumList.push(newListCal)
    }

    this.l = 0
    this.sumLados = []
    this.la = 0
    this.el1 = 0
    this.el2 = 0
    this.el3 = 0
    this.el4 = 0
    this.el5 = 0
    this.toggle = false
    this.selList = null
  }


  calculos() {
    if (this.toggle == false) {
      this.sumLados.forEach(element => {
        this.el1 = this.el1 + element
      })
      this.resultado = (this.el1) * 3.33
      this.mLin = this.el1
      console.log(this.el1)
    } else {
      this.case()
    }
  }
  case() {
    this.mLin = this.l
    /**
      * this is the case for 
      * */
    switch (this.la) {

      case 1:
        this.mCuadra = this.mLin

        break;
      case 2:
        this.sumLados.forEach(element => {
          this.el1 = element
        })
        this.sumLados.forEach(element => {
          if (this.el1 != element) {
            this.el2 = element
          }
        })
        if (this.el2 != 0) {
          this.mCuadra = this.el1 * this.el2
        } else {
          this.mCuadra = this.el1 * this.el1
        }

        break;
      case 3:
        this.sumLados.forEach(element => {
          if (this.el1 < element) {
            this.el1 = element
          }
        })
        console.log(this.el1)
        this.sumLados.forEach(element => {
          if (element != this.el1) {
            this.el2 = element
          }
        })
        console.log(this.el2)
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2) {
            this.el3 = element
          }
        })
        if (this.el2 != 0 && this.el3 != 0) {
          this.reLad()
          //cu1 = this.mLin/2
          this.n = ((this.cu1 - this.el1) * (this.cu1 - this.el2) * (this.cu1 - this.el3))
          if(this.n<=0){
            this.msgAlert()
            //this.mCuadra = Math.sqrt((this.cu1 * (this.n *-1)))

          }else{
            this.mCuadra = Math.sqrt((this.cu1 * this.n))
          }
         
          console.log(this.cu1)
          console.log(this.el1)
          console.log(this.el2)
          console.log(this.el3)
          console.log('64646 ' + this.mCuadra)
        } else {
          this.reLad()
          if (this.el2 != 0) {
            if (this.el2 == this.nR) {
              this.mCuadra = (this.el1 * (Math.sqrt((this.el2 * this.el2) - ((this.el1 * this.el1) / 4)))) / 2
            } else {
              this.mCuadra = (this.el2 * (Math.sqrt((this.el1 * this.el1) - ((this.el2 * this.el2) / 4)))) / 2
            }
          } else {
            this.mCuadra = (Math.pow(this.el1, 2)) * (Math.sqrt(3)) / 4
          }
        }
        console.log(this.mCuadra)
        break;
      case 4:
        this.sumLados.forEach(element => {
          if (this.el1 < element) {
            this.el1 = element
          }
        })

        this.sumLados.forEach(element => {
          if (element != this.el1) {
            this.el2 = element
          }
        })
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2) {
            this.el3 = element
          }
        })
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2 && element != this.el3) {
            this.el4 = element
            console.log(this.el4)
          }
        })

        if (this.el2 != 0 && this.el3 != 0 && this.el4 != 0) {
          this.reLad()
        } else {
          this.reLad()
        }

        break;
      case 5:
        this.sumLados.forEach(element => {
          if (this.el1 < element) {
            this.el1 = element
          }
        })
        console.log(this.el1)
        this.sumLados.forEach(element => {
          if (element != this.el1) {
            this.el2 = element
          }
        })
        console.log(this.el2)
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2) {
            this.el3 = element
          }
        })
        console.log(this.el3)
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2 && element != this.el3) {
            this.el4 = element
          }
        })
        console.log(this.el4)
        this.sumLados.forEach(element => {
          if (element != this.el1 && element != this.el2 && element != this.el3 && element != this.el4) {
            this.el5 = element
          }
        })
        console.log(this.el5)
        if (this.el2 != 0 && this.el1 != 0 && this.el3 != 0 && this.el4 != 0 && this.el5 != 0) {
          this.reLad()
        } else {
          this.reLad()
        }

        break;
      default:
        break;
    }
  }
  reLad() {
    this.sumLados.sort()
    let e = 0

    for (let i = 0; i < this.sumLados.length; i++) {
      e = e + this.sumLados[i]
      console.log('no se repiten ' + i + '  ' + this.sumLados[i])
      if (this.sumLados[i] == this.sumLados[i + 1]) {
        this.nR = this.sumLados[i]
        //console.log('El numero se repite: ' + this.sumLados[i])

      } else {
        if (this.sumLados[i] == this.sumLados[i - 1]) {
          this.nR = this.sumLados[i]
          //console.log('El numero se repite: ' + this.sumLados[i])
        } else {
         // console.log('no se repiten')
        }
      }
    }
    console.log('resultado ' + e)
    this.mLin = e
    this.cu1 = e / 2
  }
  async eliminarContact(indicePerfo) {
    this.sumList.splice(indicePerfo, 1)
    this.p = 0
    this.calP()
    this.userService.susses = true
    this.userService.AlertaPeque??a('Area eliminada','top')
    //this.showAlert('Area eliminada.', 'Exitoso!')
    this.sumLados2 = []
    this.ladoNombre = null
    this.ladox = null
    this.index = null
    this.lado = false
    if(this.sumList.length != 0){
      this.check = true
    }else{
      this.check = false
    }
  }
  async eliminarLado(indicePerfo) {
    this.sumLados.splice(indicePerfo, 1)
    this.sumLados1.splice(indicePerfo, 1)
    this.userService.susses = true
    this.userService.AlertaPeque??a('Metro eliminado','top')
    //this.showAlert('Lado Eliminado.', 'Exitoso!')
  }
  async eliminarLado1(indicePerfo) {
    this.sumLados2.splice(indicePerfo, 1)
    this.userService.susses = true
    this.userService.AlertaPeque??a('Metro eliminado','top')
    //this.showAlert('Lado Eliminado.', 'Exitoso!')
  }
  ReadOnly(){
    return true
  }
  async modificarLado(indicePerfo) {
    //this.ReadOnly()
    this.ladox = this.sumLados1[indicePerfo]
    this.index = indicePerfo
  }

  async modificarLado1(indicePerfo) {
    this.sumLados2 = this.sumList[indicePerfo]['sumLados']
    this.selList = this.sumList[indicePerfo]['numCuar']
    this.lado = true
    this.index = indicePerfo
    this.index2 = indicePerfo
    console.log(this.lado)

  }
  async modificarLado2(indicePerfo) {
    this.ladox = this.sumLados2[indicePerfo]
    this.index = indicePerfo

  }
  async modLado(indicePerfo) {
    if (this.index == indicePerfo) {
     this.ReadOnly()
        this.sumLados.splice(indicePerfo, 1, this.ladox)
        this.sumLados1.splice(indicePerfo, 1, this.ladox)
        this.ladox = null
        this.index = null
    } else {
      alert('selecciona el lado correcto')
    }
  }
  async modLado1(indicePerfo) {
    if (this.index == indicePerfo) {
      if (this.ladox != null) {
        this.sumLados.splice(indicePerfo, 1, this.ladox)
        this.sumLados2.splice(indicePerfo, 1, this.ladox)
        this.ladox = null
        this.index = null
      } else {
        alert('no has echo una eleccion')
      }


    } else {
      alert('selecciona el lado correcto')
    }

  }
  async modList(indicePerfo) {
    this.sumLados = []
    this.cal(this.index2)
    this.index = null
    this.userService.susses = true
    this.userService.AlertaPeque??a('Area modificada!','top')

  }
  async showAlert(msg, header) {
    const instanciaAlerta = await this.Alerta.create({
      header: header,
      subHeader: msg,
      buttons: ['cerrar']
    });

    await instanciaAlerta.present()
  }
  cargarCliente() {
    let contacto = {
      name: this.userService.contactUser['0']['name'],
      calle: this.userService.contactUser['0']['calle'],
      colonia: this.userService.contactUser['0']['colonia'],
      date: this.userService.contactUser['0']['date'],
      nuDom: this.userService.contactUser['0']['nuDom'],
      IuDom: this.userService.contactUser['0']['IuDom'],
    }
    console.log(contacto)
  }
  can() {
    if(this.check != false){
      this.check = false
    }
    //this.userService.useArea = []
    this.sumList = []
    this.agregar = false
    this.p = 0
    //console.log(this.sumList)
    //this.userService.Cancelar()
    this.selList = null
    this.ladox = null
  }
  redi() {
   
    let cotiz = {
      id: this.userService.idCal,
      nombre: this.userService.nameCal,
      Areas: this.sumList,
      total: this.p
    }
    
    
    if (this.userService.status == 'true') {
      this.userService.postArch(cotiz)
      this.sumList = []
      this.p = 0
      this.miRouter.navigate(['tabs/tab2'])
    } else {
      this.userService.todo.push(cotiz)
      this.sumList = []
      this.p = 0
      this.userService.susses = true
      this.userService.AlertaPeque??a('Area almacenada! Sin conexion','top')
      this.miRouter.navigate(['tabs/tab2'])
    }
  }
  /*async presentMsg(cotiz) {
    const alert = await this.Alerta.create({
      header: '??Aerta!',
      message: 'Guardar toda la informacion',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            

          },
        },
      ],
    });
    await alert.present();

      const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
  }*/
  async presentAlert() {
      const alert = await this.Alerta.create({
        header: '??Aerta!',
        message: 'Guardar toda la informacion',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //this.handlerMessage = 'Alert canceled';
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.userService.status = localStorage.getItem('sattus')
              this.redi()

            },
          },
        ],
      });

      await alert.present();

      const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
  }
  async msgAlert() {
    const alert = await this.Alerta.create({
      header: '??Aerta!',
      message: 'verifica bien los datos!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'OK',
          handler: () => {

          },
        }
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
}
agrega(){
  //console.log(this.userService.idCal)
  if(this.userService.status == 'true'){
    if(this.userService.useArea.length != 0){
      this.agregar = true
      if(this.sumList.length == 0){
        this.sumList = this.userService.useArea['0']['areas']
        this.p = this.userService.useArea['0']['total']
      }else{
        this.userService.showAlert('Ya hay informacion cargada', 'ERROR!!!')
      }
    }else{
      this.userService.susses = false
      this.userService.AlertaPeque??a('no tiene informacion guardada!','top')
      //this.userService.showAlert('Este cliente no tiene datos!!', 'ERROR!!!')
    }
  }else{
    if(this.todo.length == 0){
      this.userService.susses = false
    this.userService.AlertaPeque??a('Sin internet! | Sin datos!','top')
    }else{
      if(this.sumList.length == 0){
        this.sumList = this.todo['0']['Areas']
        console.log(this.sumList)
        //this.sumList = this.todo
        this.p = this.todo['0']['total']
      }else{
        this.userService.showAlert('Ya hay informacion cargada', 'ERROR!!!')
      }
    }
    //this.userService.susses = false
    //this.userService.AlertaPeque??a('Sin internet!','top')
  }
  
}
async moDato(){
    
  const alert = await this.Alerta.create({
    header: '??Alerta!',
    message: '??Seguro de modificar los datos?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'Cancelar'
      },{
        text: 'Ok',
        role: 'OK',
        handler: () => {
          this.userService.useArea = []
          let cotiz = {
            idCli: this.userService.idCal,
            //nombre: this.userService.nameCal,
            areas: this.sumList,
            total: this.p
          }
          console.log(cotiz)
          this.userService.putArea(cotiz)
          this.check = false
          this.userService.showAlert( 'Los datos se modificaron!!', 'Exito!!')
          this.sumList = []
          this.p = 0
          this.agregar =  false
        }
      }
    ],
  });

  await alert.present();
}
tog(){
  if(this.toggle == false){
    this.toggle = true
  }else{
    this.toggle = false
  }
}

  
    ngOnInit() { 
      
    }

  }
