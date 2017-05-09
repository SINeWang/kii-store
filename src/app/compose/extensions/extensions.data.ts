import {Intension} from '../intensions/intensions.data';
export class Extensions {

  ownerId: string;
  group: string;
  name: string;
  tree: string;
  id: string;

  visibility: string;
}

export class Extension {

  id: string;
  ownerId: string;
  group: string;
  name: string;
  tree: string;

  visibility: string;

  intensions: Intension[];

  schema: any;
}
