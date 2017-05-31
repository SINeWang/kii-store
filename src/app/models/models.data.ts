export class Model {

  providerId: string;
  rootExtId: string;
  pubSet: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: number;
  subscriptions: number;
  intensions: Intension[];
}

export class Intension {
  id: string;
  field: string;
  refPubSet: string;
  single: boolean;
  structure: string;
  visibility: string;
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
