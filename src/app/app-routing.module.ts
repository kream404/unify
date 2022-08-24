import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from '../app/services/auth/callback/callback.component';
import { HeroComponent } from './modules/hero/hero.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HeroComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'home', component: HomeComponent },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
