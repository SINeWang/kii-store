import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelsService} from './models.service';
import {Model} from './models.data';
import {Owners} from '../../owners/owners.data';
import {Subscriptions} from '../../subscriptions/subscriptions.data';
import {SubscriptionsCommitService} from '../../subscriptions/subscriptions-commit.service';


@Component({
  selector: 'app-explore-models',
  providers: [ModelsService, SubscriptionsCommitService],
  templateUrl: 'models.html'
})
export class ModelsComponent implements OnInit {

  errorMessage: string;

  models: Model[];

  searchForm = new Model();

  public subscribeForm: FormGroup;

  public subscribePubSet = new FormControl('', Validators.required);

  public subscribeOwnerId = new FormControl('', Validators.required);

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  public subscribeVisibility = new FormControl('public', Validators.required);

  constructor(private activatedRoute: ActivatedRoute,
              private modelsService: ModelsService,
              private subscriptionsService: SubscriptionsCommitService,
              private formBuilder: FormBuilder) {

    this.subscribeForm = formBuilder.group({
      'pubSetHash': this.subscribePubSet,
      'ownerId': this.subscribeOwnerId,
      'group': this.subscribeGroup,
      'name': this.subscribeName,
      'tree': this.subscribeTree,
      'visibility': this.subscribeVisibility,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.searchForm.group = params['group'];
        this.search();
      }
    );
  }

  search(): void {
    if (this.searchForm.group !== ''
      && this.searchForm.group != null
    ) {
      this.modelsService.visit(this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  subscribe(pubSet: string): void {
    const owners = new Owners();
    const subscriptions = new Subscriptions();
    subscriptions.pubSet = pubSet;
    subscriptions.group = this.subscribeGroup.value;
    subscriptions.name = this.subscribeName.value;
    subscriptions.tree = this.subscribeTree.value;
    owners.ownerId = this.subscribeOwnerId.value;
    this.subscriptionsService.commit(owners, subscriptions).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error
    );
  }

  handleData(models: Model[]) {
    this.models = models;
  }
}
