import {Component, OnDestroy} from '@angular/core';
import {Extensions} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model} from '../../explore/models/models.data';
import {ModelsService} from '../../explore/models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intensions/intensions.service';
import {Subscription} from 'rxjs/Subscription';
import {PublicationService} from '../publication/publication.service';
import {Publication} from '../publication/publication.data';
import {Extension} from '../extension/extension.data';
import {SubjectsService} from '../../subjects/subjects.service';
import {Subjects} from '../../subjects/subjects.data';

@Component({
  selector: 'app-compose-extensions',
  providers: [ExtensionsService, IntensionsService, ModelsService, SubjectsService, PublicationService],
  templateUrl: 'extensions.html',
})
export class ExtensionsComponent implements OnDestroy {


  private form = new Extension();

  private searchForm = new Extensions();

  private intensionForm = new Intension();

  private errorMessage: string;

  private extension: Extension;

  private publication = new Publication();

  private candidateModels: Model [];

  private candidateExtensions: Extensions[];

  private modelForm = new Model();


  modelFormControl = new FormControl();

  candidateGroupFormCtrl = new FormControl();

  ownersListener: Subscription;

  owners: Subjects;

  newExtensionModel: boolean;

  _group: string;

  constructor(private extensionService: ExtensionsService,
              private modelsService: ModelsService,
              private intensionsService: IntensionsService,
              private subjectsService: SubjectsService,
              private publicationService: PublicationService) {
    this.form.tree = 'master';

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

    this.ownersListener = subjectsService.announced$.subscribe(
      data => {
        this.owners = data;
      }
    );

  }

  add_intension(): void {
    if (this.modelFormControl.value) {
      this.intensionForm.refExtId = this.modelFormControl.value.rootExtId;
      this.intensionForm.structure = '';
    }
    this.intensionForm.extId = this.extension.id;
    this.intensionsService.commit(this.owners, this.intensionForm).subscribe(
      data => {
        this.extension.intensions = data.intensions;
        this.extension.schema = data.schema;
      },
      error => this.errorMessage = <any>error
    );
  }

  handle_extension(extension: Extension) {
    this.extension = extension;
    this.publication.providerId = extension.ownerId;
    this.publication.extId = extension.id;
  }

  onCandidateModelsChange(query: string) {
    this.modelForm.group = query;
    this.modelsService.search(this.modelForm).subscribe(
      data => this.candidateModels = data,
      error => this.errorMessage = <any>error
    );
  }

  onCandidateExtensionsChange(query: any) {
    if (query instanceof Object) {
      this.newExtensionModel = false;
      this._group = query.group;
      this.extensionService.visit(query).subscribe(
        data => this.handle_extension(data),
        error => this.errorMessage = <any>error
      );
    } else {
      const authorization = localStorage.getItem('authorization');
      if (this.owners) {
        this.searchForm.ownerId = this.owners.id;
      }
      this.searchForm.group = query;
      if (query) {
        this._group = query;
      }
      this.extensionService.search(this.searchForm).subscribe(
        data => this.candidateExtensions = data,
        error => this.errorMessage = <any>error
      );
    }
  }

  ngOnDestroy(): void {
    this.ownersListener.unsubscribe();
  }

  displaySelectedModels(model: Model): string {
    return model ? model.providerId + ' / ' + model.group + ' / ' + model.name + ' # ' + model.publication + '-' + model.version : '';
  }

  displaySelectedExtensions(extensions: Extensions): string {
    return extensions ? extensions.group + ' / ' + extensions.name + ' # ' + extensions.tree : '';
  }

  publish_extension(): void {
    this.publicationService.commit(this.publication, this.owners).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }

  remove_intension(intension: Intension): void {
    this.intensionsService.remove(this.extension, intension, this.owners).subscribe(
      data => {
        this.extension.intensions = data.intensions;
        this.extension.schema = data.schema;
      },
      error => this.errorMessage = <any>error
    );
  }
}
