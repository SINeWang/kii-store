export class Model {

  providerId: string;
  rootExtId: number;
  pubSet: number;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: number;
  subscriptions: number;
  intensions: Intension[];
}

export class Intension {
  id: number;
  field: string;
  refPubSet: number;
  single: boolean;
  structure: string;
  visibility: string;
}


export class Models {

  id: number;
  providerId: string;
  group: string;
  name: string;
  snapshots: Snapshot[];
}

export class Snapshot {
  subscriptions: number;
  pubSet: number;
  stability: string;
  version: string;
  beginTime: Date;
}
