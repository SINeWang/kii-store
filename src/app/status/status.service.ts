import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Receipt, StatusPublication} from './status-publication.data';
import {Statuses} from '../statuses/statuses.data';


@Injectable()
export class StatusService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(publication: StatusPublication, statuses: Statuses): Observable<Receipt> {
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
