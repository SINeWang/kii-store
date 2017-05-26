import {Component, Input} from '@angular/core';
import {Extension} from '../extension/extension.data';
import {Intension} from './intensions.data';
import {IntensionsService} from './intensions.service';
import {Subjects} from '../shared/subjects/subjects.data';

@Component({
  selector: 'app-intensions',
  providers: [],
  templateUrl: 'intensions.html'
})
export class IntensionsComponent {

  errorMessage: string;

  extensions: Extension;

  owners: Subjects;

  constructor(private intensionsService: IntensionsService) {
  }

  @Input()
  set owner(owner: Subjects) {
    this.owners = owner;
  }

  @Input()
  set extension(extension: Extension) {
    this.extensions = extension;
  }

  remove_intension(intension: Intension): void {
    this.intensionsService.remove(this.extensions, intension, this.owners).subscribe(
      data => {
        this.extensions.intensions = data.intensions;
        this.extensions.schema = data.schema;
      },
      error => this.errorMessage = <any>error
    );
  }
}
