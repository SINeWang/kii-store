import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Model} from './models.data';

@Injectable()
export class ModelsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  visit(modelForm: Model): Observable<Model[]> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/search/models';
    if (modelForm.group != null && modelForm.group !== '') {
      url += '?q=' + modelForm.group;
    } else {
      return Observable.of([]);
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
