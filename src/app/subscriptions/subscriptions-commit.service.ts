import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Owners} from '../owners/owners.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Subscriptions} from './subscriptions.data';
@Injectable()
export class SubscriptionsCommitService {

  private URL = environment.kiimate_url;


  constructor(private http: Http) {
  }

  commit(owners: Owners,
         subscriptions: Subscriptions): Observable<Subscriptions[]> {
    const headers = new Headers({
      'X-SUMMER-RequestId': 'random',
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.id + '/subscriptions/' + subscriptions.subSet;
    if (subscriptions.group == null) {
      return Observable.of([]);
    }
    return this.http.post(url, subscriptions, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
