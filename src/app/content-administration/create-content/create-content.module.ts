import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateContentPage } from './create-content.page';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  {
    path: '',
    component: CreateContentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ],
  declarations: [CreateContentPage]
})
export class CreateContentPageModule {}
