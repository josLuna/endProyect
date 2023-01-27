import { Component } from '@angular/core';
import { UseService } from '../services/use.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  toggle:boolean 
  array1: any []
  id:any
  id1:any
  mescla1:number
  costo1:number
  rendimiento1:number
  mescla:number
  costo:number
  rendimiento:number
  cantidad:any
  constructor(private useService:UseService) {
    this.toggle = false
  }

  modificarPost(){
    this.useService.costosVal= true
    this.useService.costo = this.useService.costo
    console.log(this.useService.costo)
    this.useService.mescla = this.useService.mescla
    this.useService.rendimiento = this.useService.rendimiento
  }
  modificarPre(){
    this.useService.costo1 = this.useService.costo1
    this.useService.mescla1 = this.useService.mescla1
    this.useService.rendimiento1 = this.useService.rendimiento1
  }
}
