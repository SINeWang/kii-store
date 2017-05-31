import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NewExtensionsService} from './new.service';
import {Extensions} from '../extensions.data';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../../shared/subjects/subjects.data';
import {SubjectsService} from '../../shared/subjects/subjects.service';

@Component({
  selector: 'app-compose-extensions-new',
  providers: [NewExtensionsService],
  templateUrl: 'new.html',
})
export class NewExtensionsComponent {

  private errorMessage: string;

  private newExtensionForm: FormGroup;

  private newExtensionName = new FormControl('', Validators.required);

  private _group: string;

  _visibility: string;

  ownersListener: Subscription;

  owners: Subjects;

  @Input()
  set group(input: any) {
    if (input instanceof Object) {
      this._group = input.group;
    } else {
      this._group = input;
    }
  }

  onVisibilityChanged(visibility: string) {
    this._visibility = visibility;
  }


  constructor(private formBuilder: FormBuilder,
              private ownersService: SubjectsService,
              private newExtensionsService: NewExtensionsService) {

    this.newExtensionForm = formBuilder.group({
      'name': this.newExtensionName,
    });

    this.ownersListener = ownersService.announced$.subscribe(
      owners => {
        this.owners = owners;
      }
    );
  }


  commit(): void {
    const authorization = localStorage.getItem('authorization');
    const extensions = new Extensions();
    extensions.ownerId = this.owners.id;
    extensions.group = this._group;
    extensions.name = this.newExtensionName.value;
    extensions.visibility = this._visibility;

    this.newExtensionsService.commit(extensions).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }


}
