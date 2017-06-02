import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Subscriptions} from '../subscriptions/subscriptions.data';
import {Observable} from 'rxjs/Observable';
import {Status} from './status.data';
@Injectable()
export class StatusService {

  private URL = environment.kiimate_url;

  constructor(private http: Http) {
  }



}
