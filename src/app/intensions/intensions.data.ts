export class Intension {
  id: number;
  extId: number;
  field: string;
  refPubSet: number;
  structure: string;
  single: boolean;
  required: boolean;
  visibility: string;
}

export class IntensionsWithSchema {
  intensions: Intension[];
  schema: any;
}
