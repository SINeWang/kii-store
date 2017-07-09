import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

import {Glimpse, GlimpseIntensions, Glimpses} from './glimpses.data';
import {Subjects} from '../shared/subjects/subjects.data';
import {Status} from '../statuses/status.data';

@Injectable()
export class GlimpsesService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(glimpses: Glimpses): Observable<Glimpse> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + glimpses.providerId + '/glimpses/' + glimpses.set;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  load_intensions(glimpses: Glimpses): Observable<GlimpseIntensions[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + glimpses.providerId + '/glimpses/' + glimpses.set + '/intensions';
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  subscribe(subscriber: Subjects, status: Status): Observable<Glimpses> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': subscriber.id,
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});
    let url = this.URL + '/';
    url += subscriber.id;
    url += '/subscriptions/glimpses';
    return this.http.post(url, status, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
}
