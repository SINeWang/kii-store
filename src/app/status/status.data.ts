import {Intension} from '../intensions/intensions.data';
export class Status {
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
