import {Component, Input} from '@angular/core';
import {Subscriptions} from '../../../subscriptions/subscriptions.data';
import {StatusService} from '../status.service';
import {Status} from '../status.data';
@Component({
  selector: 'app-compose-instances-editor',
  providers: [],
  templateUrl: 'editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  status: Status;

  subscriptions: Subscriptions;

  @Input()
  set selected_subscriptions(value: Subscriptions) {
    this.subscriptions = value;
    this.statusService.visit(value).subscribe(
      data => this.handle_instances(data),
      error => this.errorMessage = <any>error
    );
  }

  constructor(private statusService: StatusService) {
  }

  handle_instances(status: Status) {
    this.status = status;
  }

}
