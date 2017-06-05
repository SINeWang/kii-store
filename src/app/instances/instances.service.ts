import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Instances} from './instances.data';
import {Statuses} from '../statuses/statuses.data';

@Injectable()
export class InstancesService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(statuses: Statuses): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + statuses.subscriberId + '/status/' + statuses.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  commit(status: Instances, statuses: Statuses): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + statuses.subscriberId + '/status/' + statuses.id;
    return this.http.put(url, status.map, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
