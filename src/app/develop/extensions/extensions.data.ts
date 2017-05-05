export class Extension {

  ownerId: string;
  group: string;
  name: string;
  tree: string;
  extId: string;
  visibility: string;

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
