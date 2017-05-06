import {Component} from '@angular/core';
import {Extension, SearchReceipt} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model} from '../../explore/models/models.data';

@Component({
  selector: 'app-develop-extensions',
  providers: [ExtensionsService],
  templateUrl: 'extensions.html'
})
export class ExtensionsComponent {

  private form = new Extension();

  private searchForm = new Extension();

  private intensionForm = new Intension();

  private errorMessage: string;

  private searchReceipt: SearchReceipt;

  private refModel = new Model();

  constructor(private extensionService: ExtensionsService) {
    this.form.tree = 'master';
    this.form.visibility = 'public';

    this.intensionForm.visibility = 'public';
    this.intensionForm.single = true;
    this.intensionForm.structure = 'string';
  }

  commit(): void {
    const authorization = localStorage.getItem('authorization');
    this.extensionService.commit(authorization, this.form).subscribe(
      data => this.handle_commit_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  search(): void {
    const authorization = localStorage.getItem('authorization');
    this.extensionService.search(authorization, this.searchForm).subscribe(
      data => this.handle_search_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  addIntension(): void {
    console.log('intensionForm', this.intensionForm);
  }

  handle_commit_receipt(receipt: any) {
  }

  handle_search_receipt(receipt: SearchReceipt) {
    this.searchReceipt = receipt;
    this.intensionForm.extId = receipt.extId;
  }
}
