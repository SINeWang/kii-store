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

  model: Model;

  searchForm = new Model();

  public subscribeForm: FormGroup;

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  constructor(private activatedRoute: ActivatedRoute,
              private modelsService: ModelsService,
              private formBuilder: FormBuilder) {

    this.subscribeForm = formBuilder.group({
      'group': this.subscribeGroup,
      'name': this.subscribeName,
      'tree': this.subscribeTree,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.searchForm.providerId = params['providerId'];
        this.searchForm.group = params['group'];
        this.search();
      }
    );
  }

  search(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.searchForm.providerId !== ''
      && this.searchForm.group !== ''
      && this.searchForm.providerId != null
      && this.searchForm.group != null
    ) {
      this.modelsService.get(authorization, this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(model: Model) {
    this.searchForm.tree = model.tree;
    this.searchForm.name = model.name;
    this.model = model;
  }
}
