import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';

import {Subjects} from '../shared/subjects/subjects.data';
import {Statuses} from './statuses.data';
import {Status} from './status.data';

@Injectable()
export class StatusesSerivce {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  search(owners: Subjects, query: string): Observable<Statuses[]> {

    const headers = new Headers({
      'X-SUMMER-VisitorId': owners.id,
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});
    let url = this.URL + '/statuses';
    url += '?q=' + query;
    url += '&providerId=' + owners.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  visit(subscriber: Subjects, status: Statuses): Observable<Status> {

    const headers = new Headers({
      'X-SUMMER-VisitorId': subscriber.id,
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});
    let url = this.URL + '/';
    url += subscriber.id;
    url += '/status';
    url += '/' + status.group;
    url += '/' + status.name;
    url += '/' + status.stability;
    url += '/' + status.version;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
