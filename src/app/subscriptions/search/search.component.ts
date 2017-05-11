import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Subscriptions} from '../subscriptions.data';
import {Observable} from 'rxjs/Observable';
import {SubscriptionsSearchService} from './search.service';
import {Subscribers} from '../../subscribers/subscribers.data';
import {SubscribersService} from '../../subscribers/subscribers.service';

@Component({
  selector: 'app-subscriptions-search',
  providers: [],
  templateUrl: 'search.html'
})
export class SubscriptionsSearchComponent {


  errorMessage: string;

  ownerSubscription: Subscription;

  selected_subscribers: Subscribers;

  input_group = new FormControl();

  candidateSubscriptions: Subscriptions[];

  @Output()
  onFound = new EventEmitter();


  constructor(private subscribersService: SubscribersService,
              private subscriptionsService: SubscriptionsSearchService) {
    this.ownerSubscription = subscribersService.announced$.subscribe(
      owners => {
        this.selected_subscribers = owners;
      }
    );

    this.input_group.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputGroupChange(name));
  }


  onInputGroupChange(query: any) {
    if (query instanceof Object) {
      this.onFound.emit(query);
      return;
    }
    if (this.selected_subscribers) {
      this.subscriptionsService.search(query, this.selected_subscribers).subscribe(
        data => this.candidateSubscriptions = data,
        error => this.errorMessage = <any>error
      );
    } else {
      Observable.of([]);
    }

  }

  displayCandidates(subscriptions: Subscriptions): string {
    return subscriptions ? subscriptions.group + ' / ' + subscriptions.name + ' # ' + subscriptions.tree : '';
  }

}
