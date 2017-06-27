import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../user/user.service';


@Component({
  providers: [],
  templateUrl: 'oauth2login.html'
})
export class Oauth2LoginComponent implements OnInit {

  state: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private user: UserService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        const authorization = params['authorization'];
        this.findAccessToken(authorization);
      }
    );
  }

  findAccessToken(authorization: string) {
    if (authorization != null) {
      localStorage.setItem('authorization', 'Bearer ' + authorization);
    }
    authorization = localStorage.getItem('authorization');
    if (authorization == null) {
      this.router.navigate(['oauth2', 'redirect']);
      return;
    } else {
      this.user.check_in();
      this.router.navigate(['workspace']);
    }
  }

}
