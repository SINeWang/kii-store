import {Component} from '@angular/core';

import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../shared/subjects/subjects.data';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusesSerivce} from './statuses.service';
import {Statuses} from './statuses.data';
import {Status} from './status.data';


@Component({
  selector: 'app-statuses',
  providers: [SubjectsService, StatusesSerivce],
  templateUrl: 'statuses.html'
})
export class StatusesComponent {

  errorMessage: string;

  searchGroupFormCtrl = new FormControl();

  ownersListener: Subscription;

  owners: Subjects;

  candidates: Statuses[];

  status: Status;


  constructor(private ownersService: SubjectsService,
              private statusesService: StatusesSerivce,
              private route: ActivatedRoute,
              private router: Router) {
    this.ownersListener = ownersService.announced$.subscribe(
      owners => this.handleOwners(owners)
    );

    this.searchGroupFormCtrl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputGroupChanged(name));

  }

  handleOwners(owners: Subjects) {
    if (owners == null) {
      return;
    }
    this.owners = owners;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, owners.id]);
  }

  onInputGroupChanged(query: any) {
    if (this.owners == null) {
      return;
    }
    if (query instanceof Object) {
      this.statusesService.visit(this.owners, query).subscribe(
        data => this.status = data,
        error => this.errorMessage = <any>error
      );
    } else {
      this.statusesService.search(this.owners, query).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }


  }

  displaySelectedStatus(status: Status): string {
    return status ? status.group + ' / ' + status.name + ' # ' + status.tree : '';
  }


  handleData(statuses: Statuses[]) {
    this.candidates = statuses;
  }


}
