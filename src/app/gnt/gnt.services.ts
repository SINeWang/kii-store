import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {GroupNameTree} from './gnt.data';
import {environment} from '../../environments/environment';
import {Subjects} from 'app/subjects/subjects.data';
@Injectable()

export class GntService<T> {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  search(subjects: Subjects,
         targets: string,
         gnt: GroupNameTree<T>): Observable<GroupNameTree<T>[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + subjects.id + '/' + targets + '?group=' + gnt.group;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  visit(subjects: Subjects,
        targets: string,
        gnt: GroupNameTree<T>): Observable<GroupNameTree<T>> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/' + subjects.id + '/' + targets + '/' + gnt.group + '/' + gnt.name + '/' + gnt.tree;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
