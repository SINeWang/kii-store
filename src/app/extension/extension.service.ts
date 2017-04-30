import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Extension} from './extension.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class ExtensionService {

  private URL = 'http://localhost:9090/api/v1';

  constructor(private http: Http) {
  }

  get(authorization: string,
      ownerId: string,
      group: string): Observable<Extension> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.URL + '/wangyj/intension/one.euler.git.access-token', options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
