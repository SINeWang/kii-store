import {Component, Input} from '@angular/core';
import {Status} from './status.data';
import {Subjects} from '../shared/subjects/subjects.data';
import {Glimpses} from '../glimpses/glimpses.data';
import {GlimpsesService} from '../glimpses/glimpses.service';
@Component({
  selector: 'app-status',
  providers: [
    GlimpsesService
  ],
  templateUrl: 'status.html'
})
export class StatusComponent {

  status: Status;

  subscriber: Subjects;

  constructor(private glimpsesService: GlimpsesService) {

  }

  @Input()
  set the_status(status: Status) {
    this.status = status;
  }

  @Input()
  set the_subscriber(subscriber: Subjects) {
    this.subscriber = subscriber;
  }

  subscribe() {
    this.glimpsesService.subscribe(this.subscriber, this.status).subscribe(
      data => this.handle_glimpse(data)
    );
  }

  handle_glimpse(glimpses: Glimpses) {
    console.log(glimpses);
  }

}
