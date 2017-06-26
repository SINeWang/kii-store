import {Component, Input} from '@angular/core';

import {InstancesService} from '../instances.service';
import {Instances} from '../instances.data';
import {ActivatedRoute, Router} from '@angular/router';
import {Receipt, StatusPub} from '../../statuses/publication/status-pub.data';
import {StatusPubService} from '../../statuses/publication/status-pub.service';
import {ModelSub} from '../../models/subscription/model-sub.data';
import {GlimpsesSearchService} from '../../glimpses/search/glimpses-search.service';
@Component({
  selector: 'app-instances-editor',
  providers: [GlimpsesSearchService],
  templateUrl: 'inst-editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  instances: Instances;

  modelSub: ModelSub;

  visibility: string;

  publication = new StatusPub();

  @Input()
  set selected_instance(value: ModelSub) {
    this.modelSub = value;
    this.instancesService.visit(value).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  publication_stability(stability: string) {
    this.publication.stability = stability;
  }

  publication_visibility(visibility: string) {
    this.publication.visibility = visibility;
  }

  constructor(private instancesService: InstancesService,
              private statusPublisher: StatusPubService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  handle_status(instances: Instances) {
    if (this.instances == null) {
      this.instances = instances;
    }

    this.instances.previous = Object.assign({}, instances.map);
    const kv = {};
    for (const key of Object.keys(instances.map)) {
      kv[key] = instances.map[key].value;
    }
    this.instances.current = Object.assign({}, kv);
  }

  publish() {
    this.statusPublisher.commit(this.publication, this.modelSub).subscribe(
      data => this.handle_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_receipt(receipt: Receipt) {
    const parentPath = this.route.parent.snapshot.url[0].path;

    this.router.navigate([parentPath, 'statuses', {set: receipt.set}]);

  }
}
