import {Intension} from '../compose/intensions/intensions.data';
export class Asset {
  pubSet: string;
  ownerId: string;
  group: string;
  name: string;
  version: string;
  stability: string;
  intensions: Intension[];
  map: Object;
}
