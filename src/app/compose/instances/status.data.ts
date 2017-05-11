export class Status {
  ownerId: string;
  instances: Object;
  origin: Object;
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
