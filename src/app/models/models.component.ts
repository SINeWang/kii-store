import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelsService} from './models.service';
import {Model, Models} from './models.data';

import {Subjects} from '../shared/subjects/subjects.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {ModelSubService} from './subscription/model-sub.service';
import {ModelSub} from './subscription/model-sub.data';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../shared/user/user.service';
import {User} from 'app/shared/user/user.data';


@Component({
  selector: 'app-explore-models',
  providers: [ModelsService, ModelSubService, SubjectsService],
  templateUrl: 'models.html'
})
export class ModelsComponent implements OnInit {

  errorMessage: string;

  searchModelsCtl = new FormControl('', Validators.required);

  providersListener: Subscription;

  visitor: Subjects;

  selectedSnapshot = new FormControl();

  selectedModels: Models;

  selectedModel: Model;

  private candidateModels: Models [];

  public subscribeForm: FormGroup;

  public subscribeSet = new FormControl('', Validators.required);

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  constructor(private subjectsService: SubjectsService,
              private modelsService: ModelsService,
              private subscriptionsService: ModelSubService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

    this.subscribeForm = formBuilder.group({
      'set': this.subscribeSet,
      'group': this.subscribeGroup,
      'name': this.subscribeName,
      'tree': this.subscribeTree,
    });

    this.providersListener = subjectsService.announced$.subscribe(
      data => this.handle_subjects(data)
    );

    this.searchModelsCtl.valueChanges.subscribe(input => {
      if (input instanceof Object) {
        this.selectedModels = input;
        this.selectedModel = null;
      } else {
        if (input !== '' && input != null) {
          this.modelsService.search(this.visitor, input).subscribe(
            data => this.candidateModels = data,
            error => this.errorMessage = <any>error
          );
        } else {
          this.candidateModels = [];
        }
      }
    });

    this.selectedSnapshot.valueChanges.subscribe(input => {
      if (input !== '' && input != null) {
        this.modelsService.visit(this.visitor, input).subscribe(
          data => this.selectedModel = data,
          error => this.errorMessage = <any>error
        );
      } else {
        this.candidateModels = [];
      }
    });

  }

  ngOnInit(): void {
    Observable.combineLatest(
      this.userService.visit(),
      this.route.queryParams,
    ).subscribe(bothParams => {
      this.check_in(bothParams[0], bothParams[1]['set']);
    });
  }

  check_in(user: User, set: string) {
    this.visitor = new Subjects();
    this.visitor.id = user.username;
    if (set != null) {
      this.modelsService.visitBySet(this.visitor, set).subscribe(
        data => this.selectedModel = data,
        error => this.errorMessage = <any>error
      );
    }
  }


  handle_subjects(subjects: Subjects) {
    if (subjects == null) {
      return;
    }
    this.visitor = subjects;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, subjects.id]);
  }


  subscribe(pubSet: string): void {
    const subscribers = new Subjects();
    const subscriptions = new ModelSub();
    subscriptions.set = pubSet;
    subscriptions.group = this.subscribeGroup.value;
    subscriptions.name = this.subscribeName.value;
    subscriptions.tree = this.subscribeTree.value;
    subscribers.id = this.visitor.id;
    this.subscriptionsService.commit(subscribers, subscriptions).subscribe(
      error => this.errorMessage = <any>error
    );
  }


  displaySelectedModels(model: Models): string {
    return model ? model.group + ' / ' + model.name : '';
  }

}
