export class Glimpses {
  set: string;
  providerId: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: Date;
}

export class Glimpse {
  model: OutsideView;
  status: OutsideView;
}

export class OutsideView {
  id: string;
  set: string;
  providerId: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: Date;
  endTime?: Date;
}
