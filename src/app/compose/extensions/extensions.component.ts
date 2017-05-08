import {Component, OnDestroy} from '@angular/core';
import {Extension, Extensions} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model} from '../../explore/models/models.data';
import {ModelsService} from '../../explore/models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intensions/intensions.service';
import {Subscription} from 'rxjs/Subscription';
import {OwnersService} from '../../owners/owners.service';
import {Owners} from '../../owners/owners.data';

@Component({
  selector: 'app-compose-extensions',
  providers: [ExtensionsService, IntensionsService, ModelsService, OwnersService],
  templateUrl: 'extensions.html',
})
export class ExtensionsComponent implements OnDestroy {



  private form = new Extension();

  private searchForm = new Extensions();

  private intensionForm = new Intension();

  private errorMessage: string;

  private extension: Extension;

  private candidateModels: Model [];

  private candidateExtensions: Extensions[];

  private modelForm = new Model();

  modelFormControl = new FormControl();

  candidateGroupFormCtrl = new FormControl();

  ownerSubscription: Subscription;

  owners: Owners;


  constructor(private extensionService: ExtensionsService,
              private modelsService: ModelsService,
              private intensionsService: IntensionsService,
              private ownersService: OwnersService) {
    this.form.tree = 'master';
    this.form.visibility = 'public';

    this.intensionForm.visibility = 'public';
    this.intensionForm.single = true;
    this.intensionForm.required = true;
    this.intensionForm.structure = 'string';

    this.modelFormControl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateModelsChange(name));

    this.candidateGroupFormCtrl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateExtensionsChange(name));

    this.ownerSubscription = ownersService.ownerAnnounced$.subscribe(
      owners => {
        this.owners = owners;
      }
    );
  }

  commit(): void {
    const authorization = localStorage.getItem('authorization');
    this.extensionService.commit(authorization, this.form).subscribe(
      data => this.handle_commit_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  addIntension(): void {
    this.intensionForm.refExtId = this.modelFormControl.value.rootExtId;
    this.intensionForm.structure = '';
    this.intensionsService.commit(this.intensionForm).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_commit_receipt(receipt: any) {
  }

  handle_extension(extension: Extension) {
    this.extension = extension;
    this.intensionForm.extId = extension.id;
    this.intensionForm.ownerId = extension.ownerId;
  }

  onCandidateModelsChange(query: string) {
    this.modelForm.group = query;
    const authorization = localStorage.getItem('authorization');
    this.modelsService.get(authorization, this.modelForm).subscribe(
      data => this.candidateModels = data,
      error => this.errorMessage = <any>error
    );
  }

  onCandidateExtensionsChange(query: any) {
    if (query instanceof Object) {
      this.extensionService.visit(query).subscribe(
        data => this.handle_extension(data),
        error => this.errorMessage = <any>error
      );
    } else {
      const authorization = localStorage.getItem('authorization');
      if (this.owners) {
        this.searchForm.ownerId = this.owners.ownerId;
      }
      this.searchForm.group = query;
      this.extensionService.search(this.searchForm).subscribe(
        data => this.candidateExtensions = data,
        error => this.errorMessage = <any>error
      );
    }
  }

  ngOnDestroy(): void {
    this.ownerSubscription.unsubscribe();
  }

  displayFn(model: Model): string {
    return model ? model.providerId + ' / ' + model.group + ' / ' + model.name + ' # ' + model.publication + '-' + model.version : '';
  }

  displayCandidateExtensions(extensions: Extensions): string {
    return extensions ? extensions.group : '';
  }

}
