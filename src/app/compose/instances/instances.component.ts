import {Component, ViewChild} from '@angular/core';
import {OwnersService} from '../../owners/owners.service';
import {Subscription} from 'rxjs/Subscription';
import {Owners} from '../../owners/owners.data';
import {SubscriptionsSearchService} from '../../subscriptions/search/search.service';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {StatusService} from './status.service';

@Component({
  selector: 'app-compose-instances',
  providers: [OwnersService, SubscriptionsSearchService, StatusService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {

  ownerSubscription: Subscription;

  selected_owners: Owners;

  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  constructor(private ownersService: OwnersService) {
    this.ownerSubscription = ownersService.announced$.subscribe(
      data => {
        this.selected_owners = data;
      }
    );
  }

  notifyEditor(subscriptions: Subscriptions) {
    this.subscriptionsEditor.selected_subscriptions = subscriptions;
  }


}
