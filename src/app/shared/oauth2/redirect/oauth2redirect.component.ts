import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  providers: [],
  templateUrl: 'oauth2redirect.html'
})
export class Oauth2RedirectComponent implements OnInit {

  state: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const token = localStorage.getItem('authorization');
    if (token != null) {
      this.router.navigate(['oauth2', 'login']);
    } else {
      this.route.queryParams.subscribe(
        (params: Params) => {
          this.state = params['state'];
          window.location.href = environment.OAUTH2_AUTHORIZE_URL +
            '?client_id=' + environment.OAUTH2_CLIENT_ID +
            '&redirect_uri=' + environment.OAUTH2_CALLBACK_URL +
            '&response_type=code&state=' + this.state;
        }
      );
    }
  }

}
