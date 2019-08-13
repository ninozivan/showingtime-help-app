import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

import { ContentAdministrationPage } from './content-administration.page';

const routes: Routes = [
  {
    path: '',
    component: ContentAdministrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ContentAdministrationPage]
})
export class ContentAdministrationPageModule {}
