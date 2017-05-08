import {Intension} from '../intensions/intensions.data';
export class Extension {

  ownerId: string;
  group: string;
  name: string;
  tree: string;
  extId: string;
  visibility: string;

  intensions: Intension[];
}


export class SearchReceipt {

  extId: string;
  ownerId: string;
  group: string;
  name: string;
  tree: string;

  visibility: string;

  intensions: Intension[];

  schema: any;
}
