import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { timeStamp } from 'console';
import { totalmem } from 'os';
import { UseService } from '../services/use.service';
import { PDFGenerator, PDFGeneratorOptions } from "@ionic-native/pdf-generator/ngx";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],

})
export class PdfComponent implements OnInit {
  todo: any[] = []
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
  u: string
  n: number
  m: number
  sumList= []
  sumLados: any[]
  sumLados1: any[]
  sumLados2: any
  sumLados3: any
  lado: boolean
  agregar: boolean = false
  check: boolean
  Me: any[] = []
  visible2: boolean
  inputVal: String
  nAr: boolean
  check1:boolean = false
  html: string = ""
  constructor(public Alerta: AlertController, private miRouter: Router,
    private userService: UseService, private toastController: ToastController,
    private pdf1: PDFGenerator, private ptl: Platform) {
    //this.agrega()
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
    this.check = false
    this.selList = null
    this.visible2 = true
    this.check1 = false
    this.nAr= true
  }
  checkF() {
    console.log(this.check)
    if (this.check == false) {
      this.check = true
    } else {
      this.check = false
    }
  }
  checkF1() {
    if (this.check1 == false) {
      this.check1 = true
    } else {
      this.check1 = false
    }
  }
  sumLado() {

    this.visible2 = false
    console.log(this.visible2)
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
        //this.userService.AlertaPequeña('Agregado','bottom')
      }
    }
  }
  cal(index) {
    if (this.userService.sumList[index]['tog'] == false) {
      this.userService.sumList[index]['sumLados'].forEach(element => {
        this.l = this.l + element
        console.log(element)
      })
      this.mLin = this.l
      this.resultado = (this.mLin) * 3.33
      this.resultado1 = (this.resultado) * this.userService.costo
      console.log(this.userService.costo)
      this.userService.sumList[index]['result1'] = this.resultado1.toFixed()
      this.userService.sumList[index]['mLineal'] = this.l
      this.userService.sumList[index]['numCuar'] = this.selList
    } else {
      this.sumLados = this.userService.sumList[index]['sumLados']
      this.sumLados.forEach(element => {
        this.l = this.l + element
        this.la = this.la + 1
      })
      this.case()
      console.log(this.la + ' Este es el la')
      console.log(this.userService.sumList)
      if (this.la == 1) {
        this.l = 0
      }
      this.resultado1 = (this.mLin) * this.userService.costo1
      this.userService.sumList[index]['result1'] = this.resultado1.toFixed()
      this.userService.sumList[index]['mLineal'] = this.l
      this.userService.sumList[index]['mCu'] = this.mCuadra
      this.userService.sumList[index]['numCuar'] = this.selList
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
    this.userService.nAr1 = false
    if (this.sumLados.length == 0 || this.selList == null) {
      if (this.sumLados.length == 0) {

        this.userService.AlertaPequeña('Agrega una cantidad', 'top')
        //this.showAlert('Agrega los metros con el boton +Lados', 'Alerta!')
      } else {
        this.userService.susses = false
        this.userService.AlertaPequeña('Escribe un nombre para el area', 'top')
        //this.showAlert('Agrega un nombre a esta Area!!!', 'Alerta!')
      }
    } else {
      if (this.userService.useArea.length == 0) {
        this.togleTrue()
        this.userService.useToggle = this.toggle
      } else {
        if (localStorage.getItem('status') == 'true') {
          if (this.agregar == true) {
            this.togleTrue()
            this.userService.useToggle = this.toggle

          } else {
            this.userService.showAlert('Este usurio ya tiene información!!\nSELECCIONA(Mostrar Areas)', '¡Alerta!')
          }
        } else {
          this.togleTrue()
          this.userService.useToggle = this.toggle
        }

      }


    }
  }
  calP() {
    this.userService.p = 0
    this.userService.sumList.forEach(element => {
      this.m = parseInt(element.result1)
      this.userService.p = (this.userService.p + this.m)
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

      if (Math.round(parseInt(this.resultado.toFixed(1))) < this.resultado) {
        console.log(this.resultado.toFixed(1) + ' este s grande')
        this.resultado = Math.round(parseInt(this.resultado.toFixed(1))) + 1
        this.resultado1 = this.resultado * this.userService.costo
      } else {
        this.resultado1 = (Math.round(parseInt(this.resultado.toFixed(1)))) * this.userService.costo
        console.log(Math.round(parseInt(this.resultado.toFixed(1))))
      }

      this.userService.p = this.userService.p + this.resultado1
      console.log(this.userService.p)
      let newListCal = {
        numCuar: this.selList,
        mLineal: this.mLin,
        resultado: this.resultado,
        result1: this.resultado1,
        tog: this.toggle,
        u: 'post',
        sumLados: this.sumLados,
      }
      this.userService.sumList.push(newListCal)
      this.userService.susses = true
      this.userService.AlertaPequeña('Se a agregado un area', 'top')
      console.log(this.userService.sumList)

    } else {
      console.log('entras a un false')
      if (this.la == 1) {
        this.mLin = 0
      }
      this.resultado1 = (this.mCuadra) * this.userService.costo1
      this.userService.p = this.userService.p + this.resultado1
      let newListCal = {
        numCuar: this.selList,
        mLineal: this.mLin,
        result1: this.resultado1,
        mCu: this.mCuadra,
        tog: this.toggle,
        u: 'Pre',
        sumLados: this.sumLados,
      }

      this.userService.sumList.push(newListCal)
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
        console.log(this.el1)
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
          if (this.n <= 0) {
            this.msgAlert()
            //this.mCuadra = Math.sqrt((this.cu1 * (this.n *-1)))

          } else {
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
    this.userService.sumList.splice(indicePerfo, 1)
    this.userService.p = 0
    if(this.userService.sumList.length == 0){
      this.userService.nAr1 = true
      console.log(this.userService.sumList)
    }
    this.calP()
    this.userService.susses = true
    this.userService.AlertaPequeña('Area eliminada', 'top')
    //this.showAlert('Area eliminada.', 'Exitoso!')
    this.sumLados2 = []
    this.ladoNombre = null
    this.ladox = null
    this.index = null
    this.lado = false
    if (this.userService.sumList.length != 0) {
      this.check = true
    } else {
      this.check = false
    }
  }
  async eliminarLado(indicePerfo) {
    this.sumLados.splice(indicePerfo, 1)
    this.sumLados1.splice(indicePerfo, 1)
    this.userService.susses = true
    this.userService.AlertaPequeña('Metro eliminado', 'top')
    //this.showAlert('Lado Eliminado.', 'Exitoso!')
  }
  async eliminarLado1(indicePerfo) {
    this.sumLados2.splice(indicePerfo, 1)
    this.userService.susses = true
    this.userService.AlertaPequeña('Metro eliminado', 'top')
    //this.showAlert('Lado Eliminado.', 'Exitoso!')
  }
  ReadOnly() {
    return true
  }
  async modificarLado(indicePerfo) {
    //this.ReadOnly()
    this.ladox = this.sumLados1[indicePerfo]
    this.index = indicePerfo
  }

  async modificarLado1(indicePerfo) {
    this.sumLados2 = this.userService.sumList[indicePerfo]['sumLados']
    this.selList = this.userService.sumList[indicePerfo]['numCuar']
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
    this.userService.AlertaPequeña('Area modificada!', 'top')

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
    if (this.check != false) {
      this.check = false
    }
    //this.userService.useArea = []
    this.userService.sumList = []
    this.agregar = false
    this.userService.p = 0
    //console.log(this.sumList)
    //this.userService.Cancelar()
    this.selList = null
    this.ladox = null
  }
  redi() {

    let cotiz = {
      id: this.userService.idCal,
      nombre: this.userService.nameCal,
      Areas: this.userService.sumList,
      total: this.userService.p
    }

    console.log(this.userService.status)
    if (this.userService.status == 'true') {
      this.userService.postArch(cotiz)
      this.userService.sumList = []
      this.userService.p = 0
      this.miRouter.navigate(['tabs/tab2'])
    } else {
      this.userService.todo.push(cotiz)
      this.userService.sumList = []
      this.userService.p = 0
      this.userService.susses = true
      this.userService.AlertaPequeña('Area almacenada! Sin conexion', 'top')
      this.miRouter.navigate(['tabs/tab2'])
    }
  }
  /*async presentMsg(cotiz) {
    const alert = await this.Alerta.create({
      header: '¡Aerta!',
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
      header: '¡Aerta!',
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
            this.userService.status = localStorage.getItem('status')
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
      header: '¡Aerta!',
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
  agrega() {

    if (this.userService.status == 'true') {

      if (this.userService.useArea.length != 0) {
        this.agregar = true

        setTimeout(() => {
          this.nAr = false
          if (this.userService.sumList.length == 0) {
            this.userService.sumList = this.userService.useArea['0']['areas']
            console.log(this.userService.sumList, 'Estos son las areas')
            this.userService.p = this.userService.useArea['0']['total']
          } else {
            console.log(this.userService.sumList, 'Nuevo Cliente')
            this.userService.showAlert('Ya hay informacion cargada', 'ERROR!!!')
          }
        }, 100);

      } else {
        console.log(this.userService.sumList, 'Alerta pequeña')
        this.userService.susses = false
        this.userService.AlertaPequeña('no tiene informacion guardada!', 'top')
        //this.userService.showAlert('Este cliente no tiene datos!!', 'ERROR!!!')
      }
    } else {
      if (this.todo.length == 0) {
        this.userService.susses = false
        this.userService.AlertaPequeña('Sin internet! | Sin datos!', 'top')
      } else {
        if (this.userService.sumList.length == 0) {
          this.userService.sumList = this.todo['0']['Areas']
          console.log(this.userService.sumList)
          //this.sumList = this.todo
          this.userService.p = this.todo['0']['total']
        } else {
          this.userService.showAlert('Ya hay informacion cargada', 'ERROR!!!')
        }
      }
      //this.userService.susses = false
      //this.userService.AlertaPequeña('Sin internet!','top')
    }

  }
  async moDato() {

    const alert = await this.Alerta.create({
      header: '¡Alerta!',
      message: '¿Seguro de modificar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar'
        }, {
          text: 'Ok',
          role: 'OK',
          handler: () => {
            this.userService.useArea = []
            let cotiz = {
              idCli: this.userService.idCal,
              //nombre: this.userService.nameCal,
              areas: this.userService.sumList,
              total: this.userService.p
            }
            console.log(cotiz)
            this.userService.putArea(cotiz)
            this.check = false
            this.userService.showAlert('Los datos se modificaron!!', 'Exito!!')
            this.userService.sumList = []
            this.userService.p = 0
            this.agregar = false
          }
        }
      ],
    });

    await alert.present();
  }
  tog() {
    if (this.toggle == false) {

      this.toggle = true
    } else {
      this.toggle = false
    }
  }
  nArea() {
    if(this.userService.nAr){
      this.userService.nAr1 = true
      this.userService.nAr = false
    }else{
      this.userService.nAr1 = false
      this.userService.nAr = true
    }
  }
  putValor(isOpen,id,top){
    this.userService.isModalOpen = isOpen
    let valor = {
      _id:this.userService.datos.id,
      name:this.userService.nameCal,
      calle: this.userService.datos.calle,
      colonia:this.userService.datos.colonia,
      nuDom:this.userService.datos.nuDom,
      iuDum:this.userService.datos.iuDum,
    }
    this.userService.putContacto(valor)
    console.log(valor)
  }
  pdf() {
    if(this.ptl.is('cordova')) {
      var options: PDFGeneratorOptions = {
        type: "share"
      }
      this.html = document.getElementById("div1").innerHTML;
      //this.useService.showAlert(this.html, 'Alerta')
      this.pdf1.fromData(this.html, options);

    } else {
      //no me crea nada ****
      //this.html = document.getElementById("div1").innerHTML;
      console.log('Estas en una pc')
      //console.log(this.useService.useArea['0']['areas']['area']['lados'])

    }
  }
  aAre(){
    this.userService.nAr1 = true
  }
  elCli(isOpen){
    this.userService.isModalOpen = isOpen
    console.log(this.userService.datos.id)
    this.userService.delCli(this.userService.datos.id)
    setTimeout(()=>{
      this.miRouter.navigate(['tabs', 'tab2'])
    },100);

  }
  chek(){
    this.check == true
  }
  ngOnInit() {

  }

}

