import {Component} from '@angular/core';
import {Extension, SearchReceipt} from './extensions.data';
import {ExtensionsService} from './extensions.service';
import {Intension} from '../intensions/intensions.data';
import {Model} from '../../explore/models/models.data';
import {ModelsService} from '../../explore/models/models.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IntensionsService} from '../intensions/intensions.service';

@Component({
  selector: 'app-develop-extensions',
  providers: [ExtensionsService, IntensionsService, ModelsService],
  templateUrl: 'extensions.html',
})
export class ExtensionsComponent {
  private form = new Extension();

  private searchForm = new Extension();

  private intensionForm = new Intension();

  private errorMessage: string;

  private searchReceipt: SearchReceipt;

  private refModels: Model [];

  private modelForm = new Model();

  modelFormControl = new FormControl();


  constructor(private extensionService: ExtensionsService,
              private modelsService: ModelsService,
              private intensionsService: IntensionsService) {
    this.form.tree = 'master';
    this.form.visibility = 'public';

    this.intensionForm.visibility = 'public';
    this.intensionForm.single = true;
    this.intensionForm.required = true;
    this.intensionForm.structure = 'string';

    this.modelFormControl.valueChanges
      .startWith(null)
      .subscribe(name => this.onAutocompleteChange(name));
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
    this.intensionForm.refExtId = this.modelFormControl.value.rootExtId;
    console.log('intensionForm', this.intensionForm);
    console.log('modelFormControl.value', this.modelFormControl.value);
    this.intensionForm.structure = '';
    this.intensionsService.commit(this.intensionForm).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_commit_receipt(receipt: any) {
  }

  handle_search_receipt(receipt: SearchReceipt) {
    this.searchReceipt = receipt;
    this.intensionForm.extId = receipt.extId;
    this.intensionForm.ownerId = receipt.ownerId;
  }

  onAutocompleteChange(query: string) {
    this.modelForm.group = query;
    const authorization = localStorage.getItem('authorization');
    this.modelsService.get(authorization, this.modelForm).subscribe(
      data => this.refModels = data,
      error => this.errorMessage = <any>error
    );
  }

  displayFn(model: Model): string {
    return model ? model.providerId + ' / ' + model.group + ' / ' + model.name + ' # ' + model.publication + '-' + model.version : '';
  }

}
