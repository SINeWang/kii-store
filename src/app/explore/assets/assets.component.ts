import {Component} from '@angular/core';
import {AssetsService} from './assets.service';
import {Assets} from '../../assets/assets.data';
import {SubjectsService} from '../../subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../../subjects/subjects.data';
import {FormControl} from '@angular/forms';
import {Asset} from '../../asset/asset.data';


@Component({
  selector: 'app-explore-assets',
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
              private assetsService: AssetsService) {
    this.ownersListener = ownersService.announced$.subscribe(
      owners => {
        this.owners = owners;
      }
    );

    this.searchGroupFormCtrl.valueChanges
      .startWith(null)
      .subscribe(name => this.onInputGroupChanged(name));

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
