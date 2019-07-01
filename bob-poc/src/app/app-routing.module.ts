import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'feature1', loadChildren: () => import('./feature1/feature1.module').then(({Feature1Module}) => Feature1Module) },
  { path: 'home', loadChildren: () => import('./feature2/feature2.module').then(({Feature2Module}) => Feature2Module) },
  { path: 'todo', loadChildren: () => import('./feature3/feature3.module').then(({Feature3Module}) => Feature3Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
