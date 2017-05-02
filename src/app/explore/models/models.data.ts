export class Model {

  providerId: string;
  group: string;
  name: string;
  tree: string;
  extId: string;
  pubSetHash: string;
  publication: string;
  version: string;
  beginTime: number;

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
