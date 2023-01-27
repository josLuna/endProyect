import { Component, Input, OnInit } from '@angular/core';
import { UseService } from '../services/use.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-off-con',
  templateUrl: './off-con.component.html',
  styleUrls: ['./off-con.component.scss'],
})
export class OffConComponent implements OnInit {
  @Input() name = ''
  /*@Input() phone = ''
  @Input() mail = ''
  @Input() note = ''*/ 
  @Input() id = ''
  isModalOpen = false
  date:any
  calle:string
  colonia:string
  nuDom:number
  IuDom: string 
  constructor(private useService:UseService, private miRouter: Router) { }
  abrirMo(isOpen, id){
    this.isModalOpen = isOpen
    this.buscar(id)
  }
  buscar(id){
      for (let i = 0; i < this.useService.contactUser.length; i++) {
        if(id == i){
            this.calle = this.useService.contactUser[i]['calle']
            this.colonia = this.useService.contactUser[i]['colonia']
            this.date = this.useService.contactUser[i]['date']
            this.nuDom = this.useService.contactUser[i]['nuDom']
            this.IuDom = this.useService.contactUser[i]['IuDom']
        }
        
      }
    
  }
  cerrarMo(isOpen){
    this.useService.status = localStorage.getItem('status')
    let contacto1 = {
      name: this.name,
      calle: this.calle,
      nuDom: this.nuDom,
      IuDom: this.IuDom,
      colonia: this.colonia,
      date: this.date,
    }
    if(this.useService.status == 'true'){
      this.isModalOpen = isOpen
      this.useService.postClients(contacto1)
      this.useService.showAlert('Se agrego correctamente el cliente','Exitoso')
    }else{
        this.useService.showAlert('Checa tu conexion a internet','Acción no valida')
    }
    
    //this.miRouter.navigate(['tabs/tab2'])
    
  }
  pdf(id){
    console.log(id)
    if(this.useService.todo.length == 0 && this.useService.status=='false'){
      this.useService.susses = false
      this.useService.AlertaPequeña('no hay areas calculadas','top')
    }else{
      this.miRouter.navigate(['tabs/pdfindex'])
    }
    
  }
  ngOnInit() {}

}
