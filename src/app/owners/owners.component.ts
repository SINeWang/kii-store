import {Component} from '@angular/core';
import {OwnersService} from './owners.service';
import {FormControl} from '@angular/forms';
import {Owners} from './owners.data';

@Component({
  selector: 'app-owner',
  providers: [OwnersService],
  templateUrl: 'owners.html'
})
export class OwnersComponent {

  candidateOwners: Owners[];

  errorMessage: string;

  ownersFormControl = new FormControl();

  constructor(private ownersService: OwnersService) {
    this.ownersFormControl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputChange(name));
  }

  displayCandidates(owners: Owners): string {
    return owners ? owners.ownerId : '';
  }

  onInputChange(query: any) {
    if (query instanceof Object) {
      this.ownersService.announceOwners(query);
    } else {
      const authorization = localStorage.getItem('authorization');
      this.ownersService.search(query).subscribe(
        data => this.candidateOwners = data,
        error => this.errorMessage = <any>error
      );
    }
  }

}
