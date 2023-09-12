import { Component } from '@angular/core';
import { UseService } from '../services/use.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  msgAlert:boolean
  constructor(private useService:UseService,private miRouter: Router) {
    this.msgAlert = false

  }
  handleChange(event) {

    const val = event.target.value.toLowerCase();
    this.useService.results = this.useService.data.filter(d => d.nombre.toLowerCase().indexOf(val) > -1)
    //console.log(this.useService.results)
    if(this.useService.results == ''){
      this.msgAlert = true
      console.log( this.msgAlert)
    }else{
      this.msgAlert = false
    }
  }
  handleRefresh(event) {
    this.useService.nomArr = []
    this.useService.getCli = []
    this.useService.status = localStorage.getItem('status')
    console.log(this.useService.status)
    setTimeout(() => {
      if(this.useService.status == 'true'){
        this.useService.getClients().subscribe(
          (respuesta)=>{
            this.useService.nombres(respuesta)
          }
        );
      }else{
         this.useService.susses = false
          this.useService.AlertaPequeña('No tienes internet!','top')
      }
      event.target.complete();
    }, 2000);

  }
  Lista(){
    this.useService.msgCon= true
    console.log(this.useService.msgCon)
    //this.miRouter.navigate(['tabs', 'tab1'])
  }

}
