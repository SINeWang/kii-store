import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subjects} from '../../shared/subjects/subjects.data';
import {ModelSub} from '../../models/subscription/model-sub.data';
@Injectable()
export class InstancesSearchService {

  private URL = environment.kiimate_url;

  private subscriptionsSource = new BehaviorSubject<ModelSub>(null);

  announced$ = this.subscriptionsSource.asObservable();

  announce(subscriptions: ModelSub) {
    this.subscriptionsSource.next(subscriptions);
  }

  constructor(private http: Http) {
  }

  search(query: string,
         subscribers: Subjects): Observable<ModelSub[]> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': Math.random(),
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/' + subscribers.id + '/instances?q=';
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
