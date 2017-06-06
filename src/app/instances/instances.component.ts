import {Component, ViewChild} from '@angular/core';
import {StatusService} from '../status/status.service';
import {SubjectsService} from '../shared/subjects/subjects.service';

import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Subjects} from '../shared/subjects/subjects.data';

import {InstancesService} from './instances.service';
import {Statuses} from '../statuses/statuses.data';
import {InstancesSearchService} from './search/inst-search.service';

@Component({
  selector: 'app-compose-instances',
  providers: [InstancesSearchService, StatusService, SubjectsService, InstancesService, StatusService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {


  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  ownersListener: Subscription;

  owners: Subjects;

  notifyEditor(statuses: Statuses) {
    this.subscriptionsEditor.selected_statuses = statuses;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectsService: SubjectsService) {
    this.ownersListener = subjectsService.announced$.subscribe(
      data => this.handle_subjects(data)
    );
  }

  handle_subjects(subjects: Subjects) {
    if (subjects == null) {
      return;
    }
    this.owners = subjects;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, subjects.id]);
  }


}
