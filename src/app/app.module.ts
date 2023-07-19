import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: 'AIzaSyBqY2TwIcL748hZP9nPotaEVuA357O0458',
  authDomain: 'ukiyo-demo-app.firebaseapp.com',
  projectId: 'ukiyo-demo-app',
  storageBucket: 'ukiyo-demo-app.appspot.com',
  messagingSenderId: '92707618342',
  appId: '1:92707618342:web:9abc22a358bd3e8f4ff0e7'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
