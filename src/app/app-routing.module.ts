import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: MainComponent
  // },
  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found'
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
