import { Component, Injector, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { SpotifyPlayerSDK } from '../../utils/sdk/spotify.sdk';

@Component({
  selector: 'app-timebar',
  templateUrl: './timebar.component.html',
  styleUrls: ['./timebar.component.css']
})
export class TimebarComponent implements OnInit {

  _time: string; //ms
  sdk: SpotifyPlayerSDK
  position: number;
  duration: number;
  paused: boolean;
  timer: Observable<number>;
  sub: any;

  constructor(public injector: Injector) {
    this.sdk = this.injector.get(SpotifyPlayerSDK);
  }

  ngOnInit(): void {
    this.sdk.isPlaying().subscribe((playing) => {
      if(playing){
      }
    });

    this.sdk.state().subscribe((state) =>{
      this.duration = state.duration;
      this.position = state.position;
    })
  }

  onTimeChange(event: MatSliderChange) {
    if(event){
      this.sdk.seek(event.value!);
    }
  }
}
