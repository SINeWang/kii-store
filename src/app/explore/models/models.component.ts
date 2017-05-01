import {Component, OnInit} from '@angular/core';
import {ModelsService} from './models.service';
import {ActivatedRoute} from '@angular/router';
import {Extension} from './models.data';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-explore-models',
  providers: [ModelsService],
  templateUrl: 'models.html'
})
export class ModelsComponent implements OnInit {

  errorMessage: string;

  extension: Extension;

  searchForm = new Extension();

  public subscribeForm: FormGroup;

  ownerId: string;

  public subscribeGroup = new FormControl('', Validators.required);

  public subscribeName = new FormControl('default', Validators.required);

  public subscribeTree = new FormControl('master', Validators.required);

  public subscriber = new FormControl('', Validators.required);

  group: string;

  constructor(private activatedRoute: ActivatedRoute,
              private modelsService: ModelsService,
              private formBuilder: FormBuilder) {

    this.subscribeForm = formBuilder.group({
      'group': this.subscribeGroup,
      'subscriber': this.subscriber,
      'name': this.subscribeName,
      'tree': this.subscribeTree,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.searchForm.ownerId = params['ownerId'];
        this.searchForm.group = params['group'];
        this.search();
      }
    );
  }

  search(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.searchForm.ownerId !== ''
      && this.searchForm.group !== ''
      && this.searchForm.ownerId != null
      && this.searchForm.group != null
    ) {
      this.modelsService.get(authorization, this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(extension: Extension) {
    this.searchForm.tree = extension.tree;
    this.searchForm.name = extension.name;
    this.extension = extension;
  }
}
