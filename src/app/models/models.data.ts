export class Model {

  providerId: string;
  group: string;
  name: string;
  tree: string;
  extId: string;
  pubSet: string;
  stability: string;
  version: string;
  beginTime: number;

  subscriptions: number;

  intensions: Intension[];
}

export class Intension {
  id: string;
  field: string;
  refExtId: string;
  single: boolean;
  structure: string;
  visibility: string;
}


export class Models {
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
