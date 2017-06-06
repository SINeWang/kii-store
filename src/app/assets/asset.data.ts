import {Intension} from '../prototypes/intension/intensions.data';
export class Asset {
  pubSet: string;
  ownerId: string;
  group: string;
  name: string;
  version: string;
  stability: string;
  intensions: Intension[];
  map: Map<string, TimedValue>;
}

export class TimedValue {
  value: Object;
  time: Date;
}
