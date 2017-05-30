import {Component, ViewChild} from '@angular/core';
import {SubscriptionsSearchService} from '../subscriptions/search/search.service';
import {Subscriptions} from '../subscriptions/subscriptions.data';
import {StatusService} from './status.service';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {AssetsPublishService} from '../assets/assets-publish.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Subjects} from '../shared/subjects/subjects.data';

@Component({
  selector: 'app-compose-instances',
  providers: [SubscriptionsSearchService, StatusService, SubjectsService, AssetsPublishService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {


  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  ownersListener: Subscription;

  owners: Subjects;

  notifyEditor(subscriptions: Subscriptions) {
    this.subscriptionsEditor.selected_subscriptions = subscriptions;
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
