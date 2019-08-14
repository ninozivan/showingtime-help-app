import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'knowledge-base',
    loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBasePageModule)
  },
  // Content
  {
    path: 'content-administration',
    loadChildren: () => import('./content-administration/content-administration.module').then(m => m.ContentAdministrationPageModule)
  },
  {
    path: 'content-create',
    loadChildren: () => import('./content-administration/create-content/create-content.module').then(m => m.CreateContentPageModule)
  },
  // Tags
  {
    path: 'tags-administration',
    loadChildren: () => import('./tags-administration/tags-administration.module').then(m => m.TagsAdministrationPageModule)
  },
  {
    path: 'tags-administration/:tag-type',
    loadChildren: () => import('./tags-administration/tags-list/tags-list.module').then(m => m.TagsListPageModule)
  },
  {
    path: 'tags-create/:tag-type',
    loadChildren: () => import('./tags-administration/tag-create/tag-create.module').then(m => m.TagCreatePageModule)
  },
  {
    path: 'tags-administration/:tag-type/:tag-uid',
    loadChildren: () => import('./tags-administration/tag-edit/tag-edit.module').then(m => m.TagEditPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
