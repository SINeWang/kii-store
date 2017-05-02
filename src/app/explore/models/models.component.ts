import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelsService} from './models.service';
import {Model} from './models.data';


@Component({
  selector: 'app-explore-models',
  providers: [ModelsService],
  templateUrl: 'models.html'
})
export class ModelsComponent implements OnInit {

  errorMessage: string;

  models: Model[];

  searchForm = new Model();

  public subscribeForm: FormGroup;

  public subscribePubSetHash = new FormControl('', Validators.required);

  public subscribeOwnerId = new FormControl('', Validators.required);

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  public subscribeVisibility = new FormControl('protected', Validators.required);

  constructor(private activatedRoute: ActivatedRoute,
              private modelsService: ModelsService,
              private formBuilder: FormBuilder) {

    this.subscribeForm = formBuilder.group({
      'pubSetHash': this.subscribePubSetHash,
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
    const authorization = localStorage.getItem('authorization');
    if (this.searchForm.group !== ''
      && this.searchForm.group != null
    ) {
      this.modelsService.get(authorization, this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  subscribe(model: Model): void {
    const authorization = localStorage.getItem('authorization');
    console.log(this.subscribeForm);
    console.log(model);
  }

  handleData(models: Model[]) {
    this.models = models;
  }
}
