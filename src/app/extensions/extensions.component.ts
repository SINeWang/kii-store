import {Component, OnDestroy} from '@angular/core';
import {Extensions} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model, Models, Snapshot} from '../models/models.data';
import {ModelsService} from '../models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intensions/intensions.service';
import {Subscription} from 'rxjs/Subscription';
import {Extension} from '../extension/extension.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subjects} from '../shared/subjects/subjects.data';
import {ActivatedRoute, Router} from '@angular/router';
import {ProtoPub} from '../prototypes/publication/proto-pub.data';
import {ProtoPubSetvice} from '../prototypes/publication/proto-pub.service';

@Component({
  selector: 'app-extensions',
  providers: [ExtensionsService, IntensionsService, ModelsService, SubjectsService, ProtoPubSetvice],
  templateUrl: 'extensions.html',
})
export class ExtensionsComponent implements OnDestroy {


  private extension: Extension;

  private intension = new Intension();

  private protoPub = new ProtoPub();

  private errorMessage: string;

  private candidateModels: Models [];

  private candidateExtensions: Extensions[];

  searchExtensionsCtl = new FormControl();

  searchModelsCtl = new FormControl();

  searchSnapshotsCtl = new FormControl();

  selectedSnapshot: Snapshot;

  selectedModels: Models;

  selectedModel: Model;

  ownersListener: Subscription;

  owners: Subjects;

  newExtensionModel: boolean;

  constructor(private extensionService: ExtensionsService,
              private modelsService: ModelsService,
              private intensionsService: IntensionsService,
              private subjectsService: SubjectsService,
              private publicationService: ProtoPubSetvice,
              private route: ActivatedRoute,
              private router: Router) {

    this.intension.visibility = 'public';
    this.intension.single = true;
    this.intension.required = true;
    this.intension.structure = 'string';

    this.searchExtensionsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateExtensionsChange(name));

    this.searchModelsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateModelsChange(name));

    this.searchSnapshotsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateSnapshotsChange(name));

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
    if (this.selectedModel) {
      this.intension.refPubSet = this.selectedModel.pubSet;
      this.intension.structure = '';
    }
    this.intension.extId = this.extension.id;
    this.intensionsService.commit(this.owners, this.intension).subscribe(
      data => {
        this.extension.intensions = data.intensions;
        this.extension.schema = data.schema;
      },
      error => this.errorMessage = <any>error
    );
  }

  handle_extension(extension: Extension) {
    this.extension = extension;
    this.protoPub.providerId = extension.ownerId;
    this.protoPub.extId = extension.id;
  }

  onCandidateModelsChange(input: any) {
    if (input instanceof Object) {
      this.selectedModels = input;
    } else {
      this.selectedModels = null;
      this.modelsService.search(this.owners, input).subscribe(
        data => this.candidateModels = data,
        error => this.errorMessage = <any>error
      );
    }
  }

  onCandidateSnapshotsChange(input: any) {
    if (input instanceof Object) {
      this.modelsService.visit(this.owners, input).subscribe(
        data => this.selectedModel = data,
        error => this.errorMessage = <any>error
      );
    }
  }

  onCandidateExtensionsChange(input: any) {
    if (input instanceof Object) {
      this.newExtensionModel = false;
      this.extensionService.visit(input).subscribe(
        data => this.handle_extension(data),
        error => this.errorMessage = <any>error
      );
    } else {
      const authorization = localStorage.getItem('authorization');
      if (this.owners) {
        this.extensionService.search(this.owners, input).subscribe(
          data => this.candidateExtensions = data,
          error => this.errorMessage = <any>error
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.ownersListener.unsubscribe();
  }

  displaySelectedModels(models: Models): string {
    return models ? models.providerId + ' / ' + models.group + ' / ' + models.name : '';
  }

  displaySelectedExtensions(extensions: Extensions): string {
    return extensions ? extensions.group + ' / ' + extensions.name + ' # ' + extensions.tree : '';
  }

  publication_stability(stability: string) {
    this.protoPub.stability = stability;
  }

  intension_single(single: boolean) {
    this.intension.single = single;
  }

  intension_visibility(visibility: string) {
    this.intension.visibility = visibility;
  }

  intension_structure(structure: string) {
    this.intension.structure = structure;
  }

  publish_extension(): void {
    this.publicationService.commit(this.protoPub, this.owners).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }


}
