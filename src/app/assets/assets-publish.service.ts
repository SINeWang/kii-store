import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Instances} from '../compose/instances/instances.data';
import {AssetsPublication} from 'app/assets/assets-publication.data';
@Injectable()
export class AssetsPublishService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  commit(ap: AssetsPublication): Observable<Instances[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-OperatorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + ap.providerId + '/publications/assets/' + ap.publication;
    return this.http.post(url, ap, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
