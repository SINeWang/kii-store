import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from './user.data';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {


  private observer = new BehaviorSubject<User>(null);

  user$ = this.observer.asObservable();

  constructor(private http: Http) {
  }

  checkin() {
    const authorization = localStorage.getItem('authorization');
    this.visit(authorization).subscribe(
      data => this.observer.next(data)
    );
  }

  visit(authorization: string): Observable<User> {
    const headers = new Headers({'Authorization': authorization});
    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.OAUTH2_RESOURCE_USER_URL + '/user', options)
      .map((res: Response) => res.json() || {})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
