export class Model {

  providerId: string;
  group: string;
  name: string;
  tree: string;
  extId: string;
  pubSet: string;
  publication: string;
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
