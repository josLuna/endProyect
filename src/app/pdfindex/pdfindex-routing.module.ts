import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDFIndexPage } from './pdfindex.page';

const routes: Routes = [
  {
    path: '',
    component: PDFIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfindexPageRoutingModule {}
