import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditContentPage } from './edit-content.page';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  {
    path: '',
    component: EditContentPage
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
  declarations: [EditContentPage]
})
export class EditContentPageModule {}
