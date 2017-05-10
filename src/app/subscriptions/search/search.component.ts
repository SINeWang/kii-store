import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Owners} from '../../owners/owners.data';
import {OwnersService} from '../../owners/owners.service';
import {Subscription} from 'rxjs/Subscription';
import {Subscriptions} from '../subscriptions.data';
import {Observable} from 'rxjs/Observable';
import {SubscriptionsSearchService} from './search.service';

@Component({
  selector: 'app-subscriptions-search',
  providers: [],
  templateUrl: 'search.html'
})
export class SubscriptionsSearchComponent {


  errorMessage: string;

  ownerSubscription: Subscription;

  selected_owners: Owners;

  input_group = new FormControl();

  candidateSubscriptions: Subscriptions[];

  constructor(private ownersService: OwnersService,
              private subscriptionsService: SubscriptionsSearchService) {
    this.ownerSubscription = ownersService.announced$.subscribe(
      owners => {
        this.selected_owners = owners;
      }
    );

    this.input_group.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputGroupChange(name));
  }


  onInputGroupChange(query: string) {

    if (this.selected_owners) {
      this.subscriptionsService.search(query, this.selected_owners).subscribe(
        data => this.candidateSubscriptions = data,
        error => this.errorMessage = <any>error
      );
    } else {
      Observable.of([]);
    }

  }

}
