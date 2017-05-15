import {Injectable} from '@angular/core';
import {Owners} from './owners.data';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class OwnersService {

  private ownerSource = new BehaviorSubject<Owners>(null);

  announced$ = this.ownerSource.asObservable();

  private URL = environment.kiimate_url;

  announce(owners: Owners) {
    this.ownerSource.next(owners);
  }

  constructor(private http: Http) {
  }

  search(owners: string): Observable<Owners[]> {
    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': 'wangyj',
      'X-SUMMER-RequestId': 'random'
    });
    const options = new RequestOptions({headers: headers});

    const url = this.URL + '/owners?id=' + owners;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
