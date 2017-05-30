import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subjects} from './subjects.data';
import {SubjectsService} from './subjects.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subjects',
  providers: [],
  templateUrl: 'subjects.html'
})
export class SubjectsComponent implements OnInit {

  candidates: Subjects[];

  errorMessage: string;

  searchFormControl: FormControl;

  objectType: string;

  accessType: string;

  subjectIdAlias: string;

  @Input()
  set object_type(object_type: string) {
    this.objectType = object_type;
  }

  @Input()
  set access_type(access_type: string) {
    this.accessType = access_type;
  }

  @Input()
  set subject_alias(subject_alias: string) {
    this.subjectIdAlias = subject_alias;
  }

  constructor(private subjectsService: SubjectsService,
              private route: ActivatedRoute) {
  }

  displayCandidates(subjects: any): string {
    if (subjects instanceof Object) {
      return subjects ? subjects.id : '';
    } else {
      return subjects;
    }
  }

  onInputChange(query: any) {
    if (query == null) {
      return;
    }
    if (query instanceof Object) {
      this.subjectsService.announce(query);
    } else {
      this.subjectsService.search(query, this.objectType, this.accessType).subscribe(
        data => this.handle_candidates(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const subjectId = params[this.subjectIdAlias];
      if (subjectId !== null) {
        this.searchFormControl = new FormControl(subjectId);
      } else {
        this.searchFormControl = new FormControl();
      }
      this.searchFormControl.valueChanges
        .startWith(subjectId)
        .subscribe(name => this.onInputChange(name));
    });
  }

  handle_candidates(subjects: Subjects[]) {
    if (subjects == null) {
      return;
    }
    this.candidates = subjects;
    if (subjects.length === 1) {
      this.subjectsService.announce(subjects[0]);
    }
  }

}
