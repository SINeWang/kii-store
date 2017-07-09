import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Extensions} from '../extensions.data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Subjects} from '../../../shared/subjects/subjects.data';


@Injectable()
export class SearchExtensionsService {
  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  search(owners: Subjects,
         query: string): Observable<Extensions[]> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.id + '/extensions?group=' + query;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
