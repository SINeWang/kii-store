import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscribers} from './subscribers.data';
import {SubscribersService} from './subscribers.service';

@Component({
  selector: 'app-subscribers',
  providers: [],
  templateUrl: 'subscribers.html'
})
export class SubscribersComponent {

  candidateSubscribers: Subscribers[];

  errorMessage: string;

  subscriberFormControl = new FormControl();

  constructor(private subscribersService: SubscribersService) {
    this.subscriberFormControl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputChange(name));
  }

  displayCandidates(subscribers: Subscribers): string {
    return subscribers ? subscribers.subscriberId : '';
  }

  onInputChange(query: any) {
    if (query instanceof Object) {
      this.subscribersService.announce(query);
    } else {
      const authorization = localStorage.getItem('authorization');
      this.subscribersService.search(query).subscribe(
        data => this.candidateSubscribers = data,
        error => this.errorMessage = <any>error
      );
    }
  }

}
