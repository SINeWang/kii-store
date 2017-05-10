import {Component} from '@angular/core';
import {OwnersService} from '../../owners/owners.service';
import {Subscription} from 'rxjs/Subscription';
import {Owners} from '../../owners/owners.data';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {SubscriptionsSearchService} from '../../subscriptions/search/search.service';

@Component({
  selector: 'app-compose-instances',
  providers: [OwnersService, SubscriptionsSearchService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {

  errorMessage: string;

  ownerSubscription: Subscription;

  subscriptionsSubscription: Subscription;

  selected_owners: Owners;

  selected_subscriptions: Subscriptions;

  constructor(private ownersService: OwnersService,
              private subscriptionsService: SubscriptionsSearchService) {
    this.ownerSubscription = ownersService.announced$.subscribe(
      data => {
        this.selected_owners = data;
      }
    );

    this.subscriptionsSubscription = subscriptionsService.announced$.subscribe(
      data => {
        this.selected_subscriptions = data;
      }
    );

  }


}
