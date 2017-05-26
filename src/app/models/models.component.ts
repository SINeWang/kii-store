import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelsService} from './models.service';
import {Model} from './models.data';
import {Subscriptions} from '../subscriptions/subscriptions.data';
import {SubscriptionsCommitService} from '../subscriptions/subscriptions-commit.service';
import {Subjects} from '../shared/subjects/subjects.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-explore-models',
  providers: [ModelsService, SubscriptionsCommitService, SubjectsService],
  templateUrl: 'models.html'
})
export class ModelsComponent {

  errorMessage: string;

  models: Model[];

  searchGroup = new FormControl('', Validators.required);

  providersListener: Subscription;

  providers: Subjects;

  public subscribeForm: FormGroup;

  public subscribePubSet = new FormControl('', Validators.required);

  public subscribeOwnerId = new FormControl('', Validators.required);

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  constructor(private subjectsService: SubjectsService,
              private modelsService: ModelsService,
              private subscriptionsService: SubscriptionsCommitService,
              private formBuilder: FormBuilder) {

    this.subscribeForm = formBuilder.group({
      'pubSet': this.subscribePubSet,
      'ownerId': this.subscribeOwnerId,
      'group': this.subscribeGroup,
      'name': this.subscribeName,
      'tree': this.subscribeTree,
    });

    this.providersListener = subjectsService.announced$.subscribe(
      data => {
        this.providers = data;
      }
    );

    this.searchGroup.valueChanges.subscribe(input => {
      if (input !== '' && input != null) {
        this.modelsService.search(this.providers, input).subscribe(
          data => this.handleData(data),
          error => this.errorMessage = <any>error
        );
      } else {
        this.models = [];
      }
    });
  }


  subscribe(pubSet: string): void {
    const subscribers = new Subjects();
    const subscriptions = new Subscriptions();
    subscriptions.subSet = pubSet;
    subscriptions.group = this.subscribeGroup.value;
    subscriptions.name = this.subscribeName.value;
    subscriptions.tree = this.subscribeTree.value;
    subscribers.id = this.subscribeOwnerId.value;
    this.subscriptionsService.commit(subscribers, subscriptions).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error
    );
  }

  handleData(models: Model[]) {
    this.models = models;
  }
}
