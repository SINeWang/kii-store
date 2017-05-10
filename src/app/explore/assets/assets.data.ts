export class Assets {
  ownerId: string;
  group: string;
  name: string;
  tree: string;
  instances: Object;
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
