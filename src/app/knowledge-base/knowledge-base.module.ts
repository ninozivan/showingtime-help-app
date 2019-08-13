import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KnowledgeBasePage } from './knowledge-base.page';
import { StepSearchingComponent } from '../shared/step-searching/step-searching.component';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeBasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [StepSearchingComponent],
  declarations: [KnowledgeBasePage, StepSearchingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeBasePageModule {}
