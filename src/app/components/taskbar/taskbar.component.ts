import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { BearerToken } from 'src/app/model/bearer_token';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  
  authorised: Boolean | null | undefined;
  

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.authorised().subscribe((auth: Boolean | null) => {
        this.authorised = auth;
      });
  }
}
