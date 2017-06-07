import {Intension} from '../prototypes/intension/intensions.data';
export class Status {
  id: string;
  providerId: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  intensions: Intension[];
  map: Map<string, TimedValue>;
  beginTime: Date;
  endTime?: Date;
}

export class TimedValue {
  value: Object;
  time: Date;
}
