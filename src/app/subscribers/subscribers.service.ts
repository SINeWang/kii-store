import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscribers} from './subscribers.data';
@Injectable()
export class SubscribersService {

  private subscribersSource = new BehaviorSubject<Subscribers>(null);

  announced$ = this.subscribersSource.asObservable();

  private URL = environment.kiimate_url;

  announce(subscribers: Subscribers) {
    this.subscribersSource.next(subscribers);
  }

  constructor(private http: Http) {
  }

  search(subjects_id: string): Observable<Subscribers[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/subscribers?subscriberId=' + subjects_id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
