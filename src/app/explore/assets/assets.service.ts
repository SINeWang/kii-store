import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Assets} from './assets.data';

@Injectable()
export class AssetsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  get(authorization: string,
      searchForm: Assets): Observable<Assets> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.URL + '/' + searchForm.ownerId + '/instances/' + searchForm.group, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
}
