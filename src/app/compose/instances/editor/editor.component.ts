import {Component, Input} from '@angular/core';
import {Subscriptions} from '../../../subscriptions/subscriptions.data';
import {InstancesService} from '../instances.service';
import {Instances} from '../instances.data';
@Component({
  selector: 'app-compose-instances-editor',
  providers: [],
  templateUrl: 'editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  instances: Instances;

  @Input()
  set selected_subscriptions(value: Subscriptions) {
    this.instancesService.visit(value).subscribe(
      data => this.instances = data,
      error => this.errorMessage = <any>error
    );
  }

  constructor(private instancesService: InstancesService) {
  }


}
