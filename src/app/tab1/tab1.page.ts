import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UseService } from '../services/use.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private useService:UseService, private miRouter:Router) {}
  

}
