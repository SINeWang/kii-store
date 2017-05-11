import {Component, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SubscriptionsSearchService} from '../../subscriptions/search/search.service';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {StatusService} from './status.service';
import {SubscribersService} from '../../subscribers/subscribers.service';
import {Subscribers} from '../../subscribers/subscribers.data';

@Component({
  selector: 'app-compose-instances',
  providers: [SubscribersService, SubscriptionsSearchService, StatusService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {

  subscribersSubscription: Subscription;

  selected_subscribers: Subscribers;

  @ViewChild('subscriptionsSearch') subscriptionsSearch;

  @ViewChild('subscriptionsEditor') subscriptionsEditor;


  constructor(private subscribersService: SubscribersService) {
    this.subscribersSubscription = subscribersService.announced$.subscribe(
      data => {
        this.selected_subscribers = data;
      }
    );
  }

  notifyEditor(subscriptions: Subscriptions) {
    this.subscriptionsEditor.selected_subscriptions = subscriptions;
  }


}
