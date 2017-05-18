import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupNameTree} from './gnt.data';
import {FormControl} from '@angular/forms';
import {GroupNameTreeService} from './gnt.services';
import {Subjects} from 'app/subjects/subjects.data';

@Component({
  selector: 'app-gnt',
  providers: [],
  templateUrl: 'gnt.html'
})
export class GroupNameTreeComponent<T> {

  subjects: Subjects;

  errorMessage: string;

  targets: string;

  candidates: GroupNameTree<T>[];

  @Output() onGroupChanges = new EventEmitter<string>();

  @Output() onNameChanges = new EventEmitter<string>();

  @Output() onTreeChanges = new EventEmitter<string>();

  @Output() onSelected = new EventEmitter<GroupNameTree<T>>();

  candidatesFormCtrl = new FormControl();

  services: GroupNameTreeService<T>;

  constructor() {
    this.candidatesFormCtrl.valueChanges
      .startWith(null)
      .subscribe(value => this.onCandidatesChange(value));
  }

  @Input()
  set subject(subjects: Subjects) {
    this.subjects = subjects;
  }

  @Input()
  set target(targets: string) {
    this.targets = targets;
  }

  @Input()
  set service(gntService: GroupNameTreeService<T>) {
    this.services = gntService;
  }

  displaySelected(gnt: GroupNameTree<T>): string {
    return gnt ? gnt.group + ' / ' + gnt.name + ' # ' + gnt.tree : '';
  }

  onCandidatesChange(value: any) {
    if (value instanceof Object) {
      this.services.visit(this.subjects, this.targets, value).subscribe(
        gnt => {
          this.onSelected.emit(gnt);
          this.onGroupChanges.emit(gnt.group);
          this.onNameChanges.emit(gnt.name);
          this.onTreeChanges.emit(gnt.tree);
        },
        error => this.errorMessage = <any>error
      );
    } else {
      this.services.search(this.subjects, this.targets, value).subscribe(
        data => this.candidates = data,
        error => this.errorMessage = <any>error
      );
    }
  }


}
