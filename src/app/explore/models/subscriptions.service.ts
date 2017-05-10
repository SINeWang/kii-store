import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Model} from './models.data';
import {Subscriptions} from './subscriptions.data';
import {Owners} from '../../owners/owners.data';
import {environment} from '../../../environments/environment';
@Injectable()
export class SubscriptionsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(owners: Owners,
         subscriptions: Subscriptions): Observable<Model[]> {
    const headers = new Headers({
      'X-SUMMER-RequestId': 'random',
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.ownerId + '/subscriptions/' + subscriptions.pubSet;
    if (subscriptions.group == null) {
      return Observable.of([]);
    }
    return this.http.post(url, subscriptions, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
