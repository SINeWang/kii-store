import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Intension, IntensionsWithSchema} from './intensions.data';
import {Extension} from '../extension/extension.data';
import {Subjects} from '../shared/subjects/subjects.data';

@Injectable()
export class IntensionsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(owners: Subjects,
         form: Intension): Observable<IntensionsWithSchema> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.id + '/intensions';
    return this.http.post(url, form, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  remove(extension: Extension,
         intension: Intension,
         owners: Subjects): Observable<IntensionsWithSchema> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.id + '/extensions/' + extension.id + '/intensions/' + intension.id;
    return this.http.patch(url, null, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
