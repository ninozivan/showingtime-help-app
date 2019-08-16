import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';

import { StepSearchingComponent } from './step-searching/step-searching.component';

@NgModule({
  declarations: [StepSearchingComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [StepSearchingComponent]
})
export class SharedModule { }
