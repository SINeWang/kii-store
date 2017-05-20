import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subjects} from './subjects.data';
@Injectable()
export class SubjectsService {

  private ownerSource = new BehaviorSubject<Subjects>(null);

  announced$ = this.ownerSource.asObservable();

  private URL = environment.kiimate_url;

  announce(subjects: Subjects) {
    this.ownerSource.next(subjects);
  }

  constructor(private http: Http) {
  }

  search(subjectId: string,
         objectType: string,
         accessType: string): Observable<Subjects[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': Math.random()
    });
    const options = new RequestOptions({headers: headers});

    if (objectType && accessType) {
      const url = this.URL + '/subjects/' + objectType + '/' + accessType + '?q=' + subjectId;
      return this.http.get(url, options)
        .map((res: Response) => res.json() || [])
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      return Observable.of([]);
    }
  }

}
