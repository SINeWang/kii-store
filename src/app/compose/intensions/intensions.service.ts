import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Intension} from './intensions.data';
import {Owners} from '../../owners/owners.data';

@Injectable()
export class IntensionsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(form: Intension): Observable<Intension> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + form.ownerId + '/intension';
    return this.http.post(url, form, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  remove(intension: Intension,
        owners: Owners): Observable<Intension> {
    const authorization = localStorage.getItem('authorization');
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + owners.ownerId + '/intensions/' + intension.id;
    return this.http.delete(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
