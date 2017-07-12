import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Subjects} from '../../shared/subjects/subjects.data';
import {ModelSub} from '../../models/subscription/model-sub.data';
@Injectable()
export class GlimpsesSearchService {

  private URL = environment.kiimate_url;


  constructor(private http: Http) {
  }

  search(query: string,
         subscriber: Subjects): Observable<ModelSub[]> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': subscriber.id,
      'X-SUMMER-RequestId': Math.random(),
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/glimpses?providerId=' + subscriber.id;
    url += '&q=';
    if (query) {
      url += query;
    } else {
      return Observable.of([]);
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
