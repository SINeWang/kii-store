import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Extensions} from '../extensions.data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Extension} from '../../extension/extension.data';


@Injectable()
export class NewExtensionsService {
  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(form: Extensions): Observable<Extension> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + form.ownerId + '/extensions';
    return this.http.post(url, form, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
