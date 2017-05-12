import {Component, Input} from '@angular/core';
import {Subscriptions} from '../../../subscriptions/subscriptions.data';
import {StatusService} from '../status.service';
import {Status} from '../status.data';
import {Instances} from '../instances.data';
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
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  constructor(private statusService: StatusService) {
  }

  handle_status(status: Status) {
    this.status = status;
    this.status.origin = Object.assign({}, status.instances);
  }

  handle_instances(instances: Instances[]) {
    const kv = {};
    for (const instance of instances) {
      kv[instance.field] = instance.value;
    }
    this.status.instances = Object.assign({}, kv);
    this.status.origin = kv;
  }

  commit() {
    console.log(this.status);
    this.statusService.commit(this.status).subscribe(
      data => this.handle_instances(data),
      error => this.errorMessage = <any>error
    );
  }
}
