import {Intension} from '../intension/intensions.data';
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
