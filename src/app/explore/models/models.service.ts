import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Extension} from './models.data';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class ModelsService {

  private URL = 'http://localhost:9090/api/v1';

  constructor(private http: Http) {
  }

  get(authorization: string,
      extensionForm: Extension): Observable<Extension> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});

    let url = this.URL + '/' + extensionForm.ownerId + '/extensions/' + extensionForm.group + '/intensions';
    if (extensionForm.name != null && extensionForm.name !== '') {
      url = this.URL + '/' + extensionForm.ownerId + '/extensions/' + extensionForm.group + '/' + extensionForm.name + '/intensions';
    }
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
