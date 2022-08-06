import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [ AuthService]
})
export class HeroComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
