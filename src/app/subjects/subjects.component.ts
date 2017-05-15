import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subjects} from './subjects.data';
import {SubjectsService} from './subjects.service';

@Component({
  selector: 'app-subjects',
  providers: [],
  templateUrl: 'subjects.html'
})
export class SubjectsComponent {

  candidateOwners: Subjects[];

  errorMessage: string;

  ownersFormControl = new FormControl();

  constructor(private subjectsService: SubjectsService) {
    this.ownersFormControl.valueChanges
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
      this.subjectsService.search(query).subscribe(
        data => this.candidateOwners = data,
        error => this.errorMessage = <any>error
      );
    }
  }

}
