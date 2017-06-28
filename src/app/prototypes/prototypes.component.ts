import {Component, OnInit} from '@angular/core';
import {ModelsService} from '../models/models.service';
import {ProtoPubSetvice} from './publication/proto-pub.service';
import {ExtensionsService} from './extension/extensions.service';
import {IntensionsService} from './intension/intensions.service';
import {Extensions} from './extension/extensions.data';
import {FormControl} from '@angular/forms';
import {SearchExtensionsService} from './extension/search/proto-ext-search.service';
import {Subjects} from '../shared/subjects/subjects.data';
import {Extension} from 'app/prototypes/extension/extension.data';
import {ProtoPub} from './publication/proto-pub.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {NewExtensionsService} from './extension/new/proto-ext-new.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/user/user.data';
import {UserService} from '../shared/user/user.service';

@Component({
  selector: 'app-prototypes',
  providers: [
    ExtensionsService,
    IntensionsService,
    ModelsService,
    NewExtensionsService,
    ProtoPubSetvice,
    SearchExtensionsService,
    SubjectsService
  ],
  templateUrl: 'prototypes.html',
})
export class PrototypesComponent implements OnInit {


  candidateExtensions: Extensions[];

  searchExtensionsCtl = new FormControl();

  newExtensionModel: boolean;

  owners: Subjects;

  protoPub = new ProtoPub();

  errorMessage: string;

  extension: Extension;

  constructor(private searchSpi: SearchExtensionsService,
              private extensionService: ExtensionsService,
              private userService: UserService,
              private route: ActivatedRoute) {

    this.searchExtensionsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onSearchChange(name));

    this.userService.visit().subscribe(
      user => this.check_in(user)
    );

  }


  ngOnInit(): void {
  }

  check_in(user: User) {
    if (user == null) {
      return;
    }
    this.owners = new Subjects();
    this.owners.id = user.username;

    this.route.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id != null) {
          this.extensionService.visitById(this.owners, id).subscribe(
            data => this.handle_extension(data),
            error => this.errorMessage = <any>error
          );
        }
      }
    );

  }

  onSearchChange(input: any) {
    if (input instanceof Object) {
      this.newExtensionModel = false;
      const id = input['id'];
      if (this.extension != null && id === this.extension.id) {
        return;
      }
      this.extensionService.visit(this.owners, input).subscribe(
        data => this.handle_extension(data),
        error => this.errorMessage = <any>error
      );
    } else {
      if (this.owners) {
        this.searchSpi.search(this.owners, input).subscribe(
          data => this.candidateExtensions = data,
          error => this.errorMessage = <any>error
        );
      }
    }
  }


  displaySelectedExtensions(extensions: Extensions): string {
    return extensions != null ? extensions.group + ' / ' + extensions.name + ' # ' + extensions.tree : '';
  }


  handle_extension(extension: Extension) {
    if (extension == null) {
      return;
    }
    this.extension = extension;
    if (this.searchExtensionsCtl.value == null) {
      this.searchExtensionsCtl.setValue(extension);
    }

  }
}
