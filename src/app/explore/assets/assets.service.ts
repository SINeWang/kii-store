import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Assets} from '../../assets/assets.data';
import {Subjects} from '../../subjects/subjects.data';
import {Asset} from '../../asset/asset.data';

@Injectable()
export class AssetsService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }

  search(owners: Subjects, query: string): Observable<Assets[]> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});
    let url = this.URL + '/search/assets';
    url += '?q=' + query;
    url += '&ownerId=' + owners.id;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  visit(owners: Subjects, assets: Assets): Observable<Asset> {

    const headers = new Headers({
      // 'Authorization': authorization,
      'X-SUMMER-VisitorId': '123'
    });
    const options = new RequestOptions({headers: headers});
    let url = this.URL + '/';
    url += owners.id;
    url += '/assets';
    url += '/' + assets.pubSet;
    url += '/' + assets.version;
    return this.http.get(url, options)
      .map((res: Response) => res.json() || [])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
}
