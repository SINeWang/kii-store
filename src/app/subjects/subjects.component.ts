import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subjects} from './subjects.data';
import {SubjectsService} from './subjects.service';

@Component({
  selector: 'app-subjects',
  providers: [],
  templateUrl: 'subjects.html'
})
export class SubjectsComponent {

  candidates: Subjects[];

  errorMessage: string;

  searchFormControl = new FormControl();

  objectType: string;

  accessType: string;

  @Input()
  set object_type(object_type: string) {
    this.objectType = object_type;
  }

  @Input()
  set access_type(access_type: string) {
    this.accessType = access_type;
  }

  constructor(private subjectsService: SubjectsService) {
    this.searchFormControl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputChange(name));
  }

  displayCandidates(subjects: Subjects): string {
    return subjects ? subjects.id : '';
  }

  onInputChange(query: any) {
    if (query instanceof Object) {
      this.subjectsService.announce(query);
    } else {
      const authorization = localStorage.getItem('authorization');
      this.subjectsService.search(query, this.objectType, this.accessType).subscribe(
        data => this.candidates = data,
        error => this.errorMessage = <any>error
      );
    }
  }

}
