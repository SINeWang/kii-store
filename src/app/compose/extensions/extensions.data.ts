import {Intension} from '../intensions/intensions.data';
export class Extension {

  ownerId: string;
  group: string;
  name: string;
  tree: string;
  id: string;
  visibility: string;

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
