import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Provider} from './providers.data';

@Injectable()
export class ProvidersService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  get(authorization: string,
      query: string): Observable<Provider> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/explore/publishers';
    if (query != null && query !== '') {
      url += '?query' + query;
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
