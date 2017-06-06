import {Data} from '@angular/router';
export class StatusPub {
  providerId: string;
  stability: string;
  visibility: string;
  version: string;
}


export class Receipt {
  pubSet: string;
  group: string;
  name: string;
  providerId: string;
  version: string;
  visibility: string;
  beginTime: Date;
  endTime?: Data;
}
