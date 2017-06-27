import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Extension} from './extension.data';
import {Subjects} from '../../shared/subjects/subjects.data';

@Injectable()
export class ExtensionsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }


  visit(owner: Subjects, extension: Extension): Observable<Extension> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': owner.id,
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + extension.ownerId + '/extensions/' + extension.group + '/' + extension.name + '/' + extension.tree;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  visitById(owner: Subjects, id: string): Observable<Extension> {
    const headers = new Headers({
      'X-SUMMER-VisitorId': owner.id,
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/extensions/' + id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
