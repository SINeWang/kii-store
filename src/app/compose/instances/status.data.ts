export class Status {
  subId: string;
  ownerId: string;
  map: Object;
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
