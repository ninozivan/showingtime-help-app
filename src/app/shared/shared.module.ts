import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';

import { StepSearchingComponent } from './step-searching/step-searching.component';
import { KnowledgeSearchbarComponent } from './knowledge-searchbar/knowledge-searchbar.component';
import { QuickSearchComponent } from './modals/quick-search/quick-search.component';
import { ShowSearchParamsComponent } from './show-search-params/show-search-params.component';

@NgModule({
  declarations: [StepSearchingComponent, KnowledgeSearchbarComponent, QuickSearchComponent, ShowSearchParamsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  entryComponents: [StepSearchingComponent, KnowledgeSearchbarComponent, QuickSearchComponent, ShowSearchParamsComponent],
  exports: [StepSearchingComponent, KnowledgeSearchbarComponent, QuickSearchComponent, ShowSearchParamsComponent]
})
export class SharedModule { }
