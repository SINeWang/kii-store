import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Model, Models, Snapshot} from './models.data';
import {Subjects} from '../shared/subjects/subjects.data';

@Injectable()
export class ModelsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  search(providers: Subjects, group: string): Observable<Models[]> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/models';
    if (group != null && group !== '') {
      url += '?q=' + group;
      url += '&providerId=' + providers.id;
    } else {
      return Observable.of([]);
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  visit(providers: Subjects, snapshot: Snapshot): Observable<Model> {

    const headers = new Headers({
      'X-SUMMER-VisitorId': '123',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});
    if (snapshot == null) {
      return Observable.of(null);
    }
    const url = this.URL + '/models/' + snapshot.set;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
