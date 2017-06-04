import {Component} from '@angular/core';
import {AssetsService} from './assets.service';
import {Assets} from './assets.data';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../shared/subjects/subjects.data';
import {FormControl} from '@angular/forms';
import {Asset} from '../asset/asset.data';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-assets',
  providers: [AssetsService, SubjectsService],
  templateUrl: 'assets.html'
})
export class AssetsComponent {

  errorMessage: string;

  searchGroupFormCtrl = new FormControl();

  ownersListener: Subscription;

  owners: Subjects;

  candidates: Assets[];

  asset: Asset;


  constructor(private ownersService: SubjectsService,
              private assetsService: AssetsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.ownersListener = ownersService.announced$.subscribe(
      owners => this.handleOwners(owners)
    );

    this.searchGroupFormCtrl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputGroupChanged(name));

  }

  handleOwners(owners: Subjects) {
    if (owners == null) {
      return;
    }
    this.owners = owners;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, owners.id]);
  }

  onInputGroupChanged(query: any) {
    if (this.owners == null) {
      return;
    }
    if (query instanceof Object) {
      this.assetsService.visit(this.owners, query).subscribe(
        data => this.asset = data,
        error => this.errorMessage = <any>error
      );
    } else {
      this.assetsService.search(this.owners, query).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }


  }

  displaySelectedAssets(assets: Assets): string {
    return assets ? assets.group + ' / ' + assets.name + ' # ' + assets.stability + '-' + assets.version : '';
  }


  handleData(assets: Assets[]) {
    this.candidates = assets;
  }


}
