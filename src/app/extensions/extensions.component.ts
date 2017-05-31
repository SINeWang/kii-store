import {Component, OnDestroy} from '@angular/core';
import {Extensions} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model, Models} from '../models/models.data';
import {ModelsService} from '../models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intensions/intensions.service';
import {Subscription} from 'rxjs/Subscription';
import {PublicationService} from '../publication/publication.service';
import {Publication} from '../publication/publication.data';
import {Extension} from '../extension/extension.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subjects} from '../shared/subjects/subjects.data';
import {ActivatedRoute, Router} from '@angular/router';

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

  private publication = new Publication();

  private candidateModels: Models [];

  private candidateExtensions: Extensions[];

  private modelForm = new Model();

  modelFormControl = new FormControl();


  candidateGroupFormCtrl = new FormControl();

  ownersListener: Subscription;

  owners: Subjects;

  extensions: Extension;

  newExtensionModel: boolean;

  _group: string;

  constructor(private extensionService: ExtensionsService,
              private modelsService: ModelsService,
              private intensionsService: IntensionsService,
              private subjectsService: SubjectsService,
              private publicationService: PublicationService,
              private route: ActivatedRoute,
              private router: Router) {
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
      data => this.handle_subjects(data)
    );
  }

  handle_subjects(subjects: Subjects) {
    if (subjects == null) {
      return;
    }
    this.owners = subjects;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, subjects.id]);
  }

  add_intension(): void {
    if (this.modelFormControl.value) {
      this.intensionForm.refExtId = this.modelFormControl.value.rootExtId;
      this.intensionForm.structure = '';
    }
    this.intensionForm.extId = this.extensions.id;
    this.intensionsService.commit(this.owners, this.intensionForm).subscribe(
      data => {
        this.extensions.intensions = data.intensions;
        this.extensions.schema = data.schema;
      },
      error => this.errorMessage = <any>error
    );
  }

  handle_extension(extension: Extension) {
    this.extensions = extension;
    this.publication.providerId = extension.ownerId;
    this.publication.extId = extension.id;
  }

  onCandidateModelsChange(query: string) {
    this.modelForm.group = query;
    this.modelsService.search(this.owners, this.modelForm.group).subscribe(
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
      this.searchForm.group = query;
      if (query) {
        this._group = query;
      }
      if (this.owners) {
        this.extensionService.search(this.owners, this.searchForm).subscribe(
          data => this.candidateExtensions = data,
          error => this.errorMessage = <any>error
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.ownersListener.unsubscribe();
  }

  displaySelectedModels(model: Model): string {
    return model ? model.group + ' / ' + model.name + ' # ' + model.stability + '-' + model.version : '';
  }

  displaySelectedExtensions(extensions: Extensions): string {
    return extensions ? extensions.group + ' / ' + extensions.name + ' # ' + extensions.tree : '';
  }

  publication_stability(stability: string) {
    this.publication.stability = stability;
  }

  intension_single(single: boolean) {
    this.intensionForm.single = single;
  }

  intension_visibility(visibility: string) {
    this.intensionForm.visibility = visibility;
  }

  intension_structure(structure: string) {
    this.intensionForm.structure = structure;
  }

  publish_extension(): void {
    this.publicationService.commit(this.publication, this.owners).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }


}
