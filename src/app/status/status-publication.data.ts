export class StatusPublication {
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
  visibility;
  beginTime: Date;
}
