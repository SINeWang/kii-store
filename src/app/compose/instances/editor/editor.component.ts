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


  selectedSubscriptions: Subscriptions;

  @Input()
  set selected_subscriptions(value: Subscriptions) {
    this.selectedSubscriptions = value;
  }

  instances: Instances[];

  constructor(private instancesService: InstancesService) {
  }


}
