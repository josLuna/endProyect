import { Component, Input, OnInit } from '@angular/core';
import { UseService } from '../services/use.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  @Input() name = ''
  /*@Input() phone = ''
  @Input() mail = ''*/
  @Input() calle1 = ''
  @Input() id = ''
  @Input() IP=''
  isModalOpen = false
  date:any
  calle:string
  colonia:string
  nuDom:number
  iuDum: string
  check:boolean = false
  codPos:string
  id1:String
  constructor(private useService:UseService,private miRouter: Router,private toastController: ToastController) {
    /*for (let i = 0; i < .length; index++) {
      const element = array[index];

    }*/
    this.isModalOpen = false
  }
  chek(){
    this.check == true
  }
  abrirMo(isOpen, id){
    this.isModalOpen = isOpen
    this.buscar(id)
    this.check == false
  }
  cerrarMo(isOpen, id){
    this.isModalOpen = isOpen
    //this.useService.nomArr = []
    this.useService.delCli(id)
  }
  buscar(id){
      for (let i = 0; i < this.useService.getCli.length; i++) {
        if(id == this.useService.getCli[i]['_id']){

            this.calle = this.useService.getCli[i]['calle']
            this.colonia = this.useService.getCli[i]['colonia']
            this.date = this.useService.getCli[i]['date']
            this.nuDom = this.useService.getCli[i]['nuDom']
            this.iuDum = this.useService.getCli[i]['IuDom']
            this.codPos = this.useService.getCli[i]['codPos']
            this.id1 = this.useService.getCli[i]['_id']
            console.log(this.useService.getCli[i]['_id'])
            this.useService.datos={
              calle: this.calle,
              colonia: this.colonia,
              nuDom: this.nuDom,
              iuDum: this.iuDum,
              id: this.id1,
            }
            console.log(this.useService.datos.calle)
        }
      }


  }

  async modificar(isOpen,id, IP,name ){
    this.isModalOpen = isOpen
    this.useService.costos()
    this.useService.idCal = this.id1
    this.useService.nameCal = name
    this.useService.p = 0
    this.useService.safData = false
    if(this.useService.useArea.length == 0){
      this.useService.useArea = []
      this.useService.sumList = []
      this.useService.p = 0
      this.useService.getArea(name).subscribe(
        (respuesta) => {
          this.useService.UseArea(respuesta)
          console.log(name)
        }
      )
    }else{
      this.useService.useArea = []
      this.useService.sumList = []
      this.useService.getArea(name).subscribe(
        (respuesta) => {
          this.useService.UseArea(respuesta)
        }
      )
    }

    setTimeout(() => {
      this.useService.agrega()
      this.miRouter.navigate(['tabs', 'tab4'])
    }, 700);


    /*this.useService.susses = true
    this.useService.AlertaPequeña('Informacion modificada','top')
    let valor = {
      _id:id,
      calle: this.calle,
      colonia:this.colonia,
      nuDom:this.nuDom,
      iuDum:this.iuDum,
    }
    this.useService.putContacto(valor)
     //this.useService.showAlert('Se modifico de manera extosa','Exito!')*/
  }

  pdf(id){
    this.useService.idCli = id
    this.useService.getArea(id).subscribe(
      (respuesta)=>{
        this.useService.UseArea(respuesta)
      }
    )
    this.useService.buscar(id)
    this.miRouter.navigate(['tabs/pdfindex'])
  }

  Lista(){
    this.miRouter.navigate(['tabs', 'tab1'])
  }
  ngOnInit() {

  }

}
