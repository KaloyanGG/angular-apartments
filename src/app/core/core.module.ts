import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { MainComponent } from './main/main.component';
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    PublicHomeComponent,
    ApartmentsListComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavigationComponent,
    FooterComponent,
    PublicHomeComponent,
    MainComponent,
    ApartmentsListComponent
  ]
})
export class CoreModule { }
