import {Component, ViewChild} from '@angular/core';
import {Subjects} from '../shared/subjects/subjects.data';

import {InstancesService} from './instances.service';
import {InstancesSearchService} from './search/inst-search.service';
import {StatusesSerivce} from '../statuses/statuses.service';
import {StatusPubService} from '../statuses/publication/status-pub.service';
import {ModelSub} from '../models/subscription/model-sub.data';
import {User} from '../shared/user/user.data';
import {UserService} from '../shared/user/user.service';
import {SubjectsService} from '../shared/subjects/subjects.service';

@Component({
  selector: 'app-compose-instances',
  providers: [
    InstancesSearchService,
    InstancesService,
    StatusesSerivce,
    StatusPubService,
    SubjectsService],

  templateUrl: 'instances.html'
})
export class InstancesComponent {


  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  notifyEditor(instance: ModelSub) {
    this.subscriptionsEditor.selected_instance = instance;
  }

  constructor(private userService: UserService,
              private subjectService: SubjectsService) {

    this.userService.visit().subscribe(
      user => this.check_in(user)
    );
  }

  check_in(user: User) {
    if (user == null) {
      return;
    }
    const subjects = new Subjects();
    subjects.id = user.username;
    this.subjectService.announce(subjects);
  }


}
