import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { MainComponent } from './main/main.component';
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main/main-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { HomeChooserComponent } from './home-chooser/home-chooser.component';




@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    PublicHomeComponent,
    ApartmentsListComponent,
    MainComponent,
    PageNotFoundComponent,
    ApartmentDetailComponent,
    HomeChooserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    HttpClientModule
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
