export class Glimpses {
  id: string;
  set: string;
  providerId: string;
  group: string;
  name: string;
  stability: string;
  version: string;
  beginTime: Date;
}

export class Glimpse {
  model: Outside;
  status: Outside;
}

export class Outside {
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


export class GlimpseIntensions {
  field: string;
}
