export class Status {
  subId: string;
  ownerId: string;
  map: Object;
  previous: Object;
  current: Object;
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
