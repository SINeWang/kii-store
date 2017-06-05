import {Component, Input} from '@angular/core';

import {InstancesService} from '../instances.service';
import {Instances} from '../instances.data';
import {StatusService} from '../../status/status.service';
import {Statuses} from '../../statuses/statuses.data';
import {Receipt, StatusPublication} from '../../status/status-publication.data';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-compose-instances-editor',
  providers: [],
  templateUrl: 'editor.html'
})
export class InstancesEditorComponent {

  errorMessage: string;

  status: Instances;

  statuses: Statuses;

  visibility: string;

  publication = new StatusPublication();

  @Input()
  set selected_statuses(value: Statuses) {
    this.statuses = value;
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
              private statusService: StatusService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  handle_status(status: Instances) {
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
    this.instancesService.commit(next, this.statuses).subscribe(
      data => this.handle_status(data),
      error => this.errorMessage = <any>error
    );
  }

  publish() {
    this.statusService.commit(this.publication, this.statuses).subscribe(
      data => this.handle_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_receipt(receipt: Receipt) {
    const parentPath = this.route.parent.snapshot.url[0].path;

    this.router.navigate([parentPath, 'statuses', receipt.pubSet]);

  }
}
