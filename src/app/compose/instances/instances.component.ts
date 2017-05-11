import {Component, ViewChild} from '@angular/core';
import {OwnersService} from '../../owners/owners.service';
import {Subscription} from 'rxjs/Subscription';
import {Owners} from '../../owners/owners.data';
import {SubscriptionsSearchService} from '../../subscriptions/search/search.service';
import {InstancesService} from './instances.service';
import {Subscriptions} from '../../subscriptions/subscriptions.data';

@Component({
  selector: 'app-compose-instances',
  providers: [OwnersService, SubscriptionsSearchService, InstancesService],
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
