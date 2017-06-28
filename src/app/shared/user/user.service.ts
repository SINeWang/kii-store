import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {User} from './user.data';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {


  private observer = new BehaviorSubject<User>(null);

  user$ = this.observer.asObservable();

  constructor(private http: Http) {
  }

  check_in(): Promise<User> {
    const authorization = localStorage.getItem('authorization');
    return this.visit(authorization);
  }

  private visit(authorization: string): Promise<User> {
    const headers = new Headers({'Authorization': authorization});
    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.OAUTH2_RESOURCE_USER_URL + '/user', options)
      .map(response => response.json())
      .toPromise()
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
