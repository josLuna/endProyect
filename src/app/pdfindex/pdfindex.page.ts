import { Component, OnInit } from '@angular/core';
import { PDFGenerator, PDFGeneratorOptions } from "@ionic-native/pdf-generator/ngx";
import { Platform } from '@ionic/angular';
import { UseService } from '../services/use.service';
//import {Filesystem, Directory} from '@capacitor/filesystem/';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { fail } from 'assert';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-pdfindex',
  templateUrl: './pdfindex.page.html',
  styleUrls: ['./pdfindex.page.scss'],
})
export class PDFIndexPage implements OnInit {
  public progress = 0;
  data: any[] = []
  html: string = ""
  date:any
  calle:string
  colonia:string
  nuDom:number
  iuDum: string 
  nombre:string
  list: any  []
  listLad: any []
  vie:boolean = false
  constructor(private pdf1: PDFGenerator, private ptl: Platform, 
    private useService: UseService, public miRouter: Router) {
      //console.log(this.useService.idCli)
      this.list = []
      this.listLad = []
      
    }

  ngOnInit() {
    
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
      this.html = document.getElementById("div1").innerHTML;
      //console.log(this.useService.useArea['0']['areas']['area']['lados'])
      
    }


  }
  back(){
    this.useService.idCli = null
    this.useService.useArea = []
    this.useService.iL = 0
    this.miRouter.navigate(['tabs/tab2'])
  }
  moDaPdf(){
    this.useService.nameCal = this.useService.nombre1
    this.useService.iL =  0
    console.log(this.useService.useArea)
    this.useService.getArea(this.useService.idCli).subscribe(
      (respuesta)=>{
        this.useService.UseArea(respuesta)
      }
    )
    this.miRouter.navigate(['tabs', 'tab4'])
    console.log(this.useService.idCli)
  }
  
}
