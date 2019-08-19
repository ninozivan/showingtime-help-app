import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

import { KnowledgeBasePage } from './knowledge-base.page';
import { SearchTutorialComponent } from '../shared/modals/search-tutorial/search-tutorial.component';
import { KnowledgeSearchbarComponent } from '../shared/knowledge-searchbar/knowledge-searchbar.component';
import { QuickSearchComponent } from '../shared/modals/quick-search/quick-search.component';
import { InitialSearchMsgComponent } from '../shared/initial-search-msg/initial-search-msg.component';

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
    SharedModule
  ],
  declarations: [KnowledgeBasePage, SearchTutorialComponent, KnowledgeSearchbarComponent, QuickSearchComponent, InitialSearchMsgComponent],
  entryComponents: [SearchTutorialComponent, KnowledgeSearchbarComponent, QuickSearchComponent, InitialSearchMsgComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowledgeBasePageModule {}
