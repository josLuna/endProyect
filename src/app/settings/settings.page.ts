import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UseService } from '../services/use.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkMode: boolean = false
  username: string
  password: any
  constructor(private miRouter:Router, private UseService:UseService) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    this.darkMode = prefersDark.matches
    console.log(this.darkMode)
  }
  cerrarSesion()
  {
    localStorage.clear()
    this.miRouter.navigate(['login'])
  }
  costos(){
    this.UseService.costosVal = false
    this.UseService.costos()
    console.log(this.UseService.costosVal)
    this.UseService.status = localStorage.getItem('status')
    //console.log(this.UseService.status)
    this.miRouter.navigate(['tabs/tab3'])
  }
  pdf(){
    this.miRouter.navigate(['tabs/tab5'])
  }
  status(){
    this.miRouter.navigate(['tabs/tab4'])
  }
  toggleTheme(event){
    console.log(event)
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark')
    }else{
      document.body.setAttribute('color-theme', 'ligth')
    }
  }
  ngOnInit() {
  }



}
