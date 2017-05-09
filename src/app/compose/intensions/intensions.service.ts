import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Intension, IntensionsWithSchema} from './intensions.data';
import {Owners} from '../../owners/owners.data';
import {Extension} from '../extension/extension.data';

@Injectable()
export class IntensionsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(owners: Owners,
         form: Intension): Observable<IntensionsWithSchema> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.ownerId + '/intension';
    return this.http.post(url, form, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  remove(extension: Extension,
         intension: Intension,
         owners: Owners): Observable<IntensionsWithSchema> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.ownerId + '/extensions/' + extension.id + '/intensions/' + intension.id;
    return this.http.patch(url, null, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
