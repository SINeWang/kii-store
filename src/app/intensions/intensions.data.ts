export class Intension {
  id: string;
  extId: string;
  field: string;
  refPubSet: string;
  structure: string;
  single: boolean;
  required: boolean;
  visibility: string;
}

export class IntensionsWithSchema {
  intensions: Intension[];
  schema: any;
}
