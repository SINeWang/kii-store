import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Model} from '../../models/models.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subjects} from '../../shared/subjects/subjects.data';
import {ProtoPub} from './proto-pub.data';

@Injectable()
export class ProtoPubSetvice {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(publication: ProtoPub,
         subjects: Subjects): Observable<Model[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': Math.random(),
      'X-SUMMER-OperatorId': 'wangyj'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + subjects.id + '/publications/' + publication.stability + '/';
    if (publication.version) {
    } else {
      return Observable.of([]);
    }
    return this.http.post(url, publication, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
}
