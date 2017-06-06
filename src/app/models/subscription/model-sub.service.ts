import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Subjects} from '../../shared/subjects/subjects.data';
import {ModelSub} from './model-sub.data';
@Injectable()
export class ModelSubService {

  private URL = environment.kiimate_url;


  constructor(private http: Http) {
  }

  commit(subscribers: Subjects,
         subscriptions: ModelSub): Observable<ModelSub[]> {
    const headers = new Headers({
      'X-SUMMER-RequestId': 'random',
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + subscribers.id + '/subscriptions/models';
    if (subscriptions.group == null) {
      return Observable.of([]);
    }
    return this.http.post(url, subscriptions, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
