import {Component, Input} from '@angular/core';
import {Asset} from './asset.data';
@Component({
  selector: 'app-asset',
  templateUrl: 'asset.html'
})
export class AssetComponent {

  asset: Asset;

  @Input()
  set assets(asset: Asset) {
    this.asset = asset;
  }

}
