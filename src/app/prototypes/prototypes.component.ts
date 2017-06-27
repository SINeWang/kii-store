import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs/Subscription';
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
export class PrototypesComponent implements OnInit, OnDestroy {


  candidateExtensions: Extensions[];

  searchExtensionsCtl = new FormControl();

  newExtensionModel: boolean;

  owners: Subjects;

  protoPub = new ProtoPub();

  errorMessage: string;

  extension: Extension;

  userListener: Subscription;

  constructor(private searchSpi: SearchExtensionsService,
              private extensionService: ExtensionsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

    this.searchExtensionsCtl.valueChanges
      .startWith(null)
      .subscribe(name => this.onSearchExtensionsChange(name));
    this.userService.checkin();
  }


  ngOnInit(): void {
    this.userListener = this.userService.user$.subscribe(
      data => this.handle_user(data)
    );
  }

  ngOnDestroy(): void {
    this.userListener.unsubscribe();
  }

  handle_user(user: User) {
    if (user == null) {
      return;
    }
    this.owners = new Subjects();
    this.owners.id = user.username;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath]);
  }

  onSearchExtensionsChange(input: any) {
    if (input instanceof Object) {
      this.newExtensionModel = false;
      this.extensionService.visit(input).subscribe(
        data => this.handle_extension(data),
        error => this.errorMessage = <any>error
      );
    } else {
      const authorization = localStorage.getItem('authorization');
      if (this.owners) {
        this.searchSpi.search(this.owners, input).subscribe(
          data => this.candidateExtensions = data,
          error => this.errorMessage = <any>error
        );
      }
    }
  }


  displaySelectedExtensions(extensions: Extensions): string {
    return extensions ? extensions.group + ' / ' + extensions.name + ' # ' + extensions.tree : '';
  }


  handle_extension(extension: Extension) {
    this.extension = extension;
  }

}
