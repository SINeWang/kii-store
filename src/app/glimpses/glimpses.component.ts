import {Component, ViewChild} from '@angular/core';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subjects} from '../shared/subjects/subjects.data';
import {GlimpsesSearchService} from './search/glimpses-search.service';
import {Glimpses} from './glimpses.data';
import {GlimpsesService} from './glimpses.service';
import {User} from '../shared/user/user.data';
import {UserService} from '../shared/user/user.service';


@Component({
  selector: 'app-glimpses',
  providers: [
    SubjectsService,
    GlimpsesService,
    GlimpsesSearchService
  ],
  templateUrl: 'glimpses.html'
})
export class GlimpsesComponent {

  errorMessage: string;

  owners: Subjects;

  @ViewChild('glimpsesViewer') glimpsesViewer;


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

  notifyViewer(glimpses: Glimpses) {
    this.glimpsesViewer.selected_instance = glimpses;
  }

}
