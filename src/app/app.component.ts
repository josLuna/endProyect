import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UseService } from './services/use.service';
import { AlertController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logged: Boolean
  networkListener: PluginListenerHandle
  status: boolean
  Token: string = localStorage.getItem('Status')
  constructor(private miRouter: Router,
    private alertController: AlertController) {
    this.logged = false
    this.inicio()
  }
  
  inicio() {
    this.checkDarkThem()
    if (localStorage.getItem('Token') !== null) {
      this.logged = true
    }
    if (this.logged) {
      this.miRouter.navigate(['tabs', 'tab2'])
    } else {
      this.miRouter.navigate(['login'])
    }
  }
  async openAlerta(mes) {
    const alert = await this.alertController.create({
      header: 'Check the conection',
      message: mes,
      buttons: [{
        text: "Ok",
      }]
    })
    await alert.present()
  }
  async ngOnInit() {
    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status)
      //this.openAlerta(JSON.stringify(status.connected))
      localStorage.setItem('status',JSON.stringify(status.connected))

    });

    const status = await Network.getStatus()
    this.chageStatus(status)
    //this.openAlerta(JSON.stringify(status.connected))
    localStorage.setItem('status',JSON.stringify(status.connected))
    console.log('Network status:', status)
  }
  chageStatus(status) {
    this.status = status?.coonected
  }
  checkDarkThem() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    if (prefersDark.matches) {
      document.body.classList.toggle('dark')
    }
  }
}
