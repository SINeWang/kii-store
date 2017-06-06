import {Intension} from '../prototypes/intension/intensions.data';
export class Status {
  id: string;
  ownerId: string;
  group: string;
  name: string;
  tree: string;
  intensions: Intension[];
  map: Map<string, TimedValue>;
  beginTime: Date;
}

export class TimedValue {
  value: Object;
  time: Date;
}
