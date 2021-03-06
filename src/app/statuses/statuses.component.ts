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

  searchFormCtrl = new FormControl();

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

    this.searchFormCtrl.valueChanges
      .startWith(null)
      .subscribe(name => this.onSearchChanged(name));

    this.route.queryParams.subscribe(params => {
      const set = params['set'];
      if (set != null) {
        this.statusesService.visit(this.owners, set).subscribe(
          data => this.status = data,
          error => this.errorMessage = <any>error
        );
      }
    });

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

  onSearchChanged(query: any) {
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
        data => this.candidates = data,
        error => this.errorMessage = <any>error
      );
    }


  }

  displaySelected(selected: Statuses): string {
    return selected ? selected.group + ' / ' + selected.name + ' # ' + selected.stability + '-' + selected.version : '';
  }

}
