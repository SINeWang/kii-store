import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Instances} from './instances.data';
import {ModelSub} from '../models/subscription/model-sub.data';
import {Value} from './value/inst-value.data';
import {Intension} from '../prototypes/intension/intensions.data';

@Injectable()
export class InstancesService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(modelSub: ModelSub): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + modelSub.subscriberId + '/instance/' + modelSub.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  commit(values: Value[], modelSub: ModelSub, intension: Intension): Observable<Instances> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + modelSub.subscriberId + '/value/' + modelSub.id + '/fields/' + intension.field;
    return this.http.put(url, values, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
