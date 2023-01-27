import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfindexPageRoutingModule } from './pdfindex-routing.module';

import { PDFIndexPage } from './pdfindex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfindexPageRoutingModule
  ],
  declarations: [PDFIndexPage]
})
export class PdfindexPageModule {}
