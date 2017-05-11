import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Owners} from '../../owners/owners.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Subscriptions} from '../subscriptions.data';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class SubscriptionsSearchService {

  private URL = environment.kiimate_url;

  private subscriptionsSource = new BehaviorSubject<Subscriptions>(null);

  announced$ = this.subscriptionsSource.asObservable();

  announce(subscriptions: Subscriptions) {
    this.subscriptionsSource.next(subscriptions);
  }

  constructor(private http: Http) {
  }

  search(query: string,
         owners: Owners): Observable<Subscriptions[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': 'random',
      'X-SUMMER-OperatorId': 'wangyj'
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/' + owners.ownerId + '/subscriptions?q=';
    if (query) {
      url += query;
    } else {
      return Observable.of([]);
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
