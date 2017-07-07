import {Component, Input, OnInit} from '@angular/core';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intension/intensions.data';
import {Model, Models, Snapshot} from '../../models/models.data';
import {ModelsService} from '../../models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intension/intensions.service';
import {Subjects} from '../../shared/subjects/subjects.data';
import {ProtoPubSetvice} from '../publication/proto-pub.service';
import {Extension} from './extension.data';
import {ProtoPub} from '../publication/proto-pub.data';
import {UserService} from '../../shared/user/user.service';

@Component({
  selector: 'app-extensions',
  providers: [ExtensionsService, IntensionsService, ModelsService, ProtoPubSetvice],
  templateUrl: 'extensions.html',
})
export class ExtensionsComponent implements OnInit {

  private intension = new Intension();

  private errorMessage: string;

  private candidateModels: Models [];

  searchModelsCtl = new FormControl();

  searchSnapshotsCtl = new FormControl();

  selectedSnapshot: Snapshot;

  selectedModels: Models;

  selectedModel: Model;

  protoPub = new ProtoPub();

  owners: Subjects;

  extension: Extension;

  constructor(private modelsService: ModelsService,
              private intensionsService: IntensionsService,
              private publicationService: ProtoPubSetvice,
              private userService: UserService) {

    this.intension.visibility = 'public';
    this.intension.single = true;
    this.intension.required = true;
    this.intension.structure = 'string';


    this.searchModelsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateModelsChange(name));

    this.searchSnapshotsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onCandidateSnapshotsChange(name));

  }

  ngOnInit(): void {
    this.userService.visit().subscribe(
      user => {
        if (user != null) {
          this.owners = new Subjects();
          this.owners.id = user.username;
        }
      }
    );
  }

  @Input()
  set the_extension(extension: Extension) {
    if (extension) {
      this.extension = extension;
      this.protoPub.providerId = extension.ownerId;
      this.protoPub.extId = extension.id;
    }
  }


  add_intension(): void {
    if (this.selectedModel) {
      this.intension.refSet = this.selectedModel.set;
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


  displaySelectedModels(models: Models): string {
    return models ? models.providerId + ' / ' + models.group + ' / ' + models.name : '';
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
