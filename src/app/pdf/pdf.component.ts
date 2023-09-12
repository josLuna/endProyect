import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { timeStamp } from 'console';
import { totalmem } from 'os';
import { UseService } from '../services/use.service';
import { PDFGenerator, PDFGeneratorOptions } from "@ionic-native/pdf-generator/ngx";
import { Platform } from '@ionic/angular';
import { element } from 'protractor';

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
  sumList = []
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
  check1: boolean = false
  html: string = ""
  isDisabled: boolean = false
  selectedIndex: number = -1
  isModalOpen: boolean
  resultador: number
  display: any = '0';
  firstval: number = null;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma: boolean
  array:any =[]
  safData: boolean = false
  chek1: boolean = false
  simbolo: any = []
  numero1: string = ''
  sigs: any = []
  ext = 0
  constructor(public Alerta: AlertController, private miRouter: Router,
    private userService: UseService, private toastController: ToastController,
    private pdf1: PDFGenerator, private ptl: Platform,) {
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
    this.nAr = true
    this.isModalOpen = false
    this.resultador = 0
    this.array=[]
    this.iscomma = false
  }
  numero(value) {
    console.log(value)
    this.resultador = this.resultador + value
  }
  edtnombre(isModalOpen) {
    if (this.isModalOpen) {
      this.isModalOpen = isModalOpen
    } else {
      this.isModalOpen = isModalOpen
    }

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
        this.calcular()
        console.log('esto es algo 1')
        this.ladox = null

      } else {
        this.sumLados.push(this.ladox)
        this.sumLados2.push(this.ladox)
        this.userService.safData=true
        this.ladox = null
        //this.userService.AlertaPequeña('Agregado','bottom')
      }
    }
  }
  cal(index) {
    if (this.userService.sumList[index]['tog'] == false) {
      this.userService.sumList[index]['sumLados'].forEach(element => {
        this.l = this.l + element
        console.log(this.l)
      })
      this.mLin = this.l
      this.resultado = (this.mLin) * 3.33
      this.resultado1 = (this.resultado) * this.userService.costo
      console.log(this.resultado)
      this.userService.sumList[index]['result1'] = this.resultado1.toFixed()
      this.userService.sumList[index]['mLineal'] = this.l
      this.userService.sumList[index]['resultado'] = this.resultado
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
        if(this.userService.safData){
          if(this.userService.iL == 0 ){
            this.userService.safData=false
          }

        }
        console.log(this.userService.iL, ' 1')
      } else {
        if (localStorage.getItem('status') == 'true') {
          // if (this.agregar) {
            this.togleTrue()
            this.userService.useToggle = this.toggle
            this.userService.safData=true
            console.log(this.userService.iL, ' 2')

          // } else {
          //   this.userService.showAlert('Este usurio ya tiene información!!\nSELECCIONA(Mostrar Areas)', '¡Alerta!')
          // }
        }
        else {
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
    const alert = await this.userService.Alerta.create({
      header: 'Eliminar area!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

            this.userService.sumList.splice(indicePerfo, 1)
            this.userService.p = 0
            if (this.userService.sumList.length == 0) {
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
            this.userService.safData=true
            if (this.userService.sumList.length != 0) {
              this.check = true
            } else {
              this.check = false
            }
          },
        },
      ],
    });

    await alert.present();

  }
  async eliminarLado(indicePerfo) {
    this.sumLados.splice(indicePerfo, 1)
    this.sumLados1.splice(indicePerfo, 1)
    this.userService.susses = true
    this.userService.AlertaPequeña('Metro eliminado', 'top')
    //this.showAlert('Lado Eliminado.', 'Exitoso!')
  }
  async eliminarLado1(indicePerfo) {
    this.sumLados2 = []
    // this.sumLados2.splice(indicePerfo, 1)
    // this.userService.susses = true
    // this.userService.AlertaPequeña('Metro eliminado', 'top')
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
    console.log(this.sumLados2[0])

  }
  async modificarLado2(indicePerfo) {
    this.selectedIndex = indicePerfo;
    console.log(this.selectedIndex)
    //this.ladox = this.sumLados2[indicePerfo]
    // console.log(this.ladox, 'esto es los ladox')
    this.index = indicePerfo
    this.chek1 = true
  }
  // selectInput(index: number) {
  //   this.selectedIndex = index;
  // }
  async modLado(indicePerfo) {
    if (this.index == indicePerfo) {
      this.ReadOnly()
      this.sumLados.splice(indicePerfo, 1, this.ladox)
      this.sumLados1.splice(indicePerfo, 1, this.ladox)
      this.ladox = null
      this.index = null
      this.chek1 = false
    } else {
      alert('selecciona el lado correcto')
    }
  }
  valor(data) {
    console.log(data)
    this.ladox = parseInt(data)
  }
  async modLado1(indicePerfo, modLado1) {
    this.userService.safData= true
    if (this.selectedIndex == indicePerfo) {
      this.sumLados.splice(indicePerfo, 1, this.ladox)
      this.sumLados2.splice(indicePerfo, 1, this.ladox)
      console.log(this.sumLados2)
      this.modList(indicePerfo)
      this.ladox = null
      this.index = null
    } else {
      alert('selecciona el lado correcto')
    }
  }
  async modList(indicePerfo) {
    this.sumLados = []
    console.log(this.index)
    this.cal(this.index2)
    this.index = null
    this.selectedIndex = -1
    this.userService.susses = true
    this.sumLados2 = []
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
      console.log(this.userService.todo)
      this.userService.sumList = []
      this.userService.p = 0
      this.userService.susses = true
      this.userService.AlertaPequeña('Area almacenada! Sin conexion', 'top')
      this.miRouter.navigate(['tabs/tab2'])
    }
  }

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
            this.userService.safData=false
            // this.userService.sumList = []
            // this.userService.p = 0
            // this.agregar = false
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
    if (this.userService.nAr) {
      this.userService.nAr1 = true
      this.userService.nAr = false
    } else {
      if(this.userService.sumList.length){
        this.userService.nAr1 = false
        this.userService.nAr = false
      }else{
        this.userService.nAr1 = false
        this.userService.nAr = true
      }
    }
  }
  putValor(isOpen, id, top) {
    this.userService.isModalOpen = isOpen
    let valor = {
      _id: this.userService.datos.id,
      name: this.userService.nameCal,
      calle: this.userService.datos.calle,
      colonia: this.userService.datos.colonia,
      nuDom: this.userService.datos.nuDom,
      iuDum: this.userService.datos.iuDum,
    }
    this.userService.putContacto(valor)
    console.log(valor)
  }
  pdf() {
    if (this.ptl.is('cordova')) {
      var options: PDFGeneratorOptions = {
        type: "share"
      }
      this.html = document.getElementById("div1").innerHTML;
      //this.useService.showAlert(this.html, 'Alerta')
      this.pdf1.fromData(this.html, options);

    } else {
      //no me crea nada ****
      this.html = document.getElementById("div1").innerHTML;
      console.log( this.html)
      //console.log(this.useService.useArea['0']['areas']['area']['lados'])

    }
  }
  aAre() {
    this.userService.nAr1 = true
  }
  elCli(isOpen) {
    this.userService.isModalOpen = isOpen
    console.log(this.userService.datos.id)
    this.userService.delCli(this.userService.datos.id)
    setTimeout(() => {
      this.miRouter.navigate(['tabs', 'tab2'])
    }, 100);

  }
  chek() {
    this.check == true
  }
  /**
   * esto es de la calculadora inicio
   */
  click(val: any) {
    switch (val) {
      case 'ac':
        this.display = '0';
        this.firstval = null;
        this.operator = null;
        this.newcursor = false;
        this.iscomma = false
        this.simbolo = []
        this.numero1 = ''
        break;
      case 'c':
        this.display = '0';
        this.isc = false;
        this.iscomma = false
        break;
      case ':':
        this.addnumber('÷')
        // this.addoperator(':');
        // this.display = '0'
        break;
      case 'X':
        this.addnumber('x')
        //this.addoperator('X');
        // this.display = '0'
        break;
      case '-':
        this.addnumber('-');
        // this.display = '0'
        break;
      case '+':
        this.addnumber('+');
        // this.display = '0'
        break;
      case '=':
        //this.addnumber('=')
        // this.calculate()
        this.addnumber('=');
        this.calculate()
        // if (this.firstval !== null && this.operator !== null) {
        //   this.calclast();
        // }
        // this.operator = null;
        break;
      case '0':
        this.addnumber('0')
        break;
      case '1':
        this.addnumber('1')
        //this.addnumber('1');
        break;
      case '2':
        this.addnumber('2')
        // this.addnumber('2');
        break;
      case '3':
        this.addnumber('3')
        // this.addnumber('3');
        break;
      case '4':
        this.addnumber('4');
        break;
      case '5':
        this.addnumber('5');
        break;
      case '6':
        this.addnumber('6');
        break;
      case '7':
        this.addnumber('7');
        break;
      case '8':
        this.addnumber('8');
        break;
      case '9':
        this.addnumber('9');
        break;
      case ',':
        if (this.iscomma === false) {
          this.iscomma = true;
        } else {
          this.userService.AlertaPequeña('ya seleccionaste el .', 'top')
          // this.iscomma = false;
        }
        break;
    }
  }
  cap() {
    let valor = this.simbolo.find((elemento) => elemento === '÷')
    let valor1 = this.simbolo.find((elemento) => elemento === '+')
    let valor2 = this.simbolo.find((elemento) => elemento === 'x')
    let valor3 = this.simbolo.find((elemento) => elemento === '-')
    let val1
    if (this.simbolo.includes('÷')) {
      for (let i = 0; i < this.simbolo.length; i++) {
        if (this.simbolo[i] == valor) {
          val1 = this.simbolo[i - 1] / this.simbolo[i + 1]
          this.simbolo[i - 1] = `${val1}`
          this.simbolo.splice(i, 2);
          i = 0
        }
      }
    }
    if (this.simbolo.includes('x')) {
      for (let i = 0; i < this.simbolo.length; i++) {
        if (this.simbolo[i] == valor2) {
          val1 = this.simbolo[i - 1] * this.simbolo[i + 1]
          this.simbolo[i - 1] = `${val1}`
          console.log(this.simbolo)
          this.simbolo.splice(i, 2);
          console.log(this.simbolo)
          i = 0
        }
      }
    }

    if (this.simbolo.includes('+')) {
      for (let i = 0; i < this.simbolo.length; i++) {
        if (this.simbolo[i] == valor1) {
          val1 = Number(this.simbolo[i - 1]) + Number(this.simbolo[i + 1])
          this.simbolo[i - 1] = `${val1}`
          this.simbolo.splice(i, 2);
          console.log(this.simbolo)
          i = 0
        }
      }
    }
    if (this.simbolo.includes('-')) {
      for (let i = 0; i < this.simbolo.length; i++) {
        if (this.simbolo[i] == valor3) {
          val1 = this.simbolo[i - 1] - this.simbolo[i + 1]
          this.simbolo[i - 1] = `${val1}`
          this.simbolo.splice(i, 2);
          i = 0
        }
      }
    }
    return val1
  }
  calculate() {
    let res = 0
    if (this.simbolo.length > 3) {
      this.display = this.cap()
    } else {
      for (let i = 0; i < this.simbolo.length; i++) {
        console.log(this.simbolo[i])
        if (this.simbolo[i] == '÷') {
          res = Number(this.simbolo[i - 1]) / Number(this.simbolo[i + 1])
          this.simbolo[i - 1] = `${res}`
          this.simbolo.splice(i, 2);
          console.log(this.simbolo)
        } else if (this.simbolo[i] == 'x') {
          res = Number(this.simbolo[i - 1]) * Number(this.simbolo[i + 1])
          this.simbolo[i - 1] = `${res}`
          this.simbolo.splice(i, 2);
          console.log(this.simbolo)
        } else if (this.simbolo[i] == '+') {
          res = Number(this.simbolo[i - 1]) + Number(this.simbolo[i + 1])
          this.simbolo[i - 1] = `${res}`
          this.simbolo.splice(i, 2);
          console.log(this.simbolo)
        } else if (this.simbolo[i] == '-') {
          res = Number(this.simbolo[i - 1]) - Number(this.simbolo[i + 1])
          this.simbolo[i - 1] = `${res}`
          this.simbolo.splice(i, 2);
        }
      }
      this.display = `${res}`
    }

  }
  addnumber(nbr: string) {

    if (nbr == '+' || nbr == '-' || nbr == 'x' || nbr == '÷' || nbr == '=') {
      if (this.numero1 != '') {
        this.simbolo.push(this.numero1)
      }
      if (nbr !== '=') {
        this.simbolo.push(nbr)
      }
      this.numero1 = ''
      this.iscomma = false
      this.ext=0

    } else {
      if (this.iscomma == true) {
        if(this.numero1.indexOf('.')!==-1){
          this.userService.AlertaPequeña('valor no haceptador','top')
        }else{
          this.numero1 += `.${nbr}`

        }

      } else {
        this.numero1 += nbr
      }
    }

    if (this.display == '0') {
      this.display = nbr
    } else {
      if (nbr != '=') {
        if (this.iscomma === false) {
          this.display += nbr
        } else {
          if(this.ext == 0){
            this.display = `${this.display.toString()}.${nbr}`;
            this.ext = 1
          }
          this.iscomma = false
        }
      }
    }
  }
  addpercent(isModalOpen) {
    if(this.display !== '0'){
      this.isModalOpen = isModalOpen
      this.ladox = Number(this.display)
      this.display = '0'
      this.iscomma = false
    }else{
      this.userService.AlertaPequeña('No has calculado nada', 'top')
    }
  }
  /**
   * final de calculadora
   */
  otA(){
    this.userService.nAr1 = true

  }
  ngOnInit() {

  }

}

