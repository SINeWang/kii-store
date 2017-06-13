import {Intension} from '../prototypes/intension/intensions.data';
export class Model {

  providerId: string;
  rootExtId: string;
  set: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: Date;
  subscriptions: number;
  intensions: Intension[];
}



export class Models {

  id: string;
  providerId: string;
  group: string;
  name: string;
  snapshots: Snapshot[];
}

export class Snapshot {
  subscriptions: number;
  pubSet: string;
  stability: string;
  version: string;
  beginTime: Date;
}
