import { Component, Input, OnInit } from '@angular/core';
import { UseService } from '../../services/use.service';

@Component({
  selector: 'app-modificador',
  templateUrl: './modificador.component.html',
  styleUrls: ['./modificador.component.scss'],
})
export class ModificadorComponent implements OnInit {
  @Input() name = ''
  @Input() phone = ''
  @Input() calle = ''
  @Input() note = ''
  @Input() id = ''
  constructor(private useService:UseService) { }

  ngOnInit() {}

}
