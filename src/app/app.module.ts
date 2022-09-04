import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FetchRequestor, Requestor } from '@openid/appauth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './modules/hero/hero.component';
import { AuthService } from './services/auth/auth.service';
import { CallbackComponent } from './services/auth/callback/callback.component';
import { HomeComponent } from './modules/home/home.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider'; 

import { SpotifyPlayerComponent } from './services/spotify_service/spotify-player/spotify-player.component';




@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    CallbackComponent,
    HomeComponent,
    TaskbarComponent,
    SpotifyPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [
      AuthService,
      { provide: Requestor, useValue: new FetchRequestor()},
      SpotifyPlayerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


