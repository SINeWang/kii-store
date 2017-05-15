import {Injectable} from '@angular/core';
import {Publication} from './publication.data';
import {Observable} from 'rxjs/Observable';
import {Model} from '../../explore/models/models.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Owners} from '../../owners/owners.data';

@Injectable()
export class PublicationService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(publication: Publication,
         owners: Owners): Observable<Model[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': 'random',
      'X-SUMMER-OperatorId': 'wangyj'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.id + '/' + publication.publication + '/';
    if (publication.version) {
    } else {
      return Observable.of([]);
    }
    return this.http.post(url, publication, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
}
