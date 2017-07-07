import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../user/user.service';


@Component({
  providers: [
    UserService
  ],
  template: ''
})
export class Oauth2LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
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

    }
  }

}
