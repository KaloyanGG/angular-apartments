import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MainRoutingModule } from './core/main/main-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthService, initializeMyService } from './auth/auth.service';


const firebaseConfig = {
  apiKey: 'AIzaSyColgecIi06WyIppKsP2CsBjdynBz0qrpQ',
  projectId: 'angular-softuni'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireAuthModule,
    AuthModule,
    AppRoutingModule,
    MainRoutingModule,
    BrowserModule,
    CoreModule
  ],
  providers: [

    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMyService,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
