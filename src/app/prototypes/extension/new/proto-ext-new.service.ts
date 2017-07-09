import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Extensions} from '../extensions.data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Extension} from '../extension.data';
import {environment} from '../../../../environments/environment';


@Injectable()
export class NewExtensionsService {
  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(form: Extensions): Observable<Extension> {
    const headers = new Headers({
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + form.ownerId + '/extensions';
    return this.http.post(url, form, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
