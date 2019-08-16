import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewContentPage } from './view-content.page';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';

const routes: Routes = [
  {
    path: '',
    component: ViewContentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewContentPage, SanitizeHtmlPipe]
})
export class ViewContentPageModule {}
