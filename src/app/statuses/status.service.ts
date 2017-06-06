import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

import {Statuses} from './statuses.data';
import {Receipt, StatusPub} from './publication/status-pub.data';


@Injectable()
export class StatusService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(publication: StatusPub, statuses: Statuses): Observable<Receipt> {
    const headers = new Headers({
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + statuses.subscriberId + '/publications/status/' + statuses.id;
    return this.http.post(url, publication, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
