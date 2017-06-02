import {Component, Input} from '@angular/core';
import {Status} from './status.data';
@Component({
  selector: 'app-status',
  templateUrl: 'status.html'
})
export class StatusComponent {

  status: Status;

  @Input()
  set set_status(status: Status) {
    this.status = status;
  }

}
