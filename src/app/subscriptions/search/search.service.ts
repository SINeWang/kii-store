import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Subscriptions} from '../subscriptions.data';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subjects} from '../../shared/subjects/subjects.data';
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
         subscribers: Subjects): Observable<Subscriptions[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': Math.random(),
      'X-SUMMER-OperatorId': 'wangyj'
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/' + subscribers.id + '/subscriptions?q=';
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
