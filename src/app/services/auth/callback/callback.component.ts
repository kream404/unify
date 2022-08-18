// Copyright 2018 Ping Identity
//
// Licensed under the MIT License (the "License"); you may not use this file
// except in compliance with the License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RedirectRequestHandler } from '@openid/appauth';
import { AuthService } from '../../auth/auth.service';
import { AppRoutingModule } from '../../../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

    constructor(public authorizationService: AuthService, public router: Router, private route: ActivatedRoute,) { }

    ngOnInit() {
      const code = this.route.snapshot.queryParamMap.get('code');
      if(code){
        this.authorizationService.completeAuthorizationRequest(code);
      }
  }

  test(){
    console.log(window.location.hash.toString());
  }

}
