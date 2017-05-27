import {Component, Input} from '@angular/core';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {StatusService} from '../status.service';
import {Status} from '../status.data';
import {Instances} from '../instances.data';
import {AssetsPublishService} from '../../assets/assets-publish.service';
import {AssetsPublication} from '../../assets/assets-publication.data';
@Component({
  selector: 'app-compose-instances-editor',
  providers: [],
  templateUrl: 'editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  status: Status;

  subscriptions: Subscriptions;

  visibility: string;

  assetsPublication = new AssetsPublication();

  @Input()
  set selected_subscriptions(value: Subscriptions) {
    this.subscriptions = value;
    this.assetsPublication.providerId = value.subscriberId;
    this.assetsPublication.subId = value.id;
    this.statusService.visit(value).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  constructor(private statusService: StatusService,
              private assetsPublishService: AssetsPublishService) {
  }

  handle_status(status: Status) {
    this.status = status;
    this.status.previous = Object.assign({}, status.map);
    const kv = {};
    for (const key of Object.keys(status.map)) {
      kv[key] = status.map[key].value;
    }
    this.status.current = Object.assign({}, kv);
  }


  save() {
    const next = Object.assign({}, this.status);
    next.map = this.status.current;
    this.statusService.commit(next).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  publication_visibility(visibility: string) {
    this.assetsPublication.visibility = visibility;
  }

  publication_stability(stability: string) {
    this.assetsPublication.stability = stability;
  }


  publish() {
    this.assetsPublishService.commit(this.assetsPublication).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }
}
