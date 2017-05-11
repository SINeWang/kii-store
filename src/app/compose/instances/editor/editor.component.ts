import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Subscriptions} from '../../../subscriptions/subscriptions.data';
import {InstancesService} from '../instances.service';
import {Instances} from '../instances.data';
@Component({
  selector: 'app-compose-instances-editor',
  providers: [],
  templateUrl: 'editor.html'
})
export class InstancesEditorComponent implements OnChanges {


  @Input()
  selected_subscriptions: Subscriptions;

  instances: Instances[];

  constructor(private instancesService: InstancesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


}
