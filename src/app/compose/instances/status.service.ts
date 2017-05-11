import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {Observable} from 'rxjs/Observable';
import {Status} from './status.data';
@Injectable()
export class StatusService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(subscriptions: Subscriptions): Observable<Status> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + subscriptions.subscriberId + '/status/' + subscriptions.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
