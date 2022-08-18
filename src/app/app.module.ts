import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { FetchRequestor, Requestor } from '@openid/appauth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { AuthService } from './services/auth/auth.service';
import { CallbackComponent } from './services/auth/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      AuthService,
      { provide: Requestor, useValue: new FetchRequestor()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


