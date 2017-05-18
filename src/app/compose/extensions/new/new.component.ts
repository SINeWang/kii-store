import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NewExtensionsService} from './new.service';
import {Extensions} from '../extensions.data';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../../../subjects/subjects.data';
import {SubjectsService} from '../../../subjects/subjects.service';

@Component({
  selector: 'app-compose-extensions-new',
  providers: [NewExtensionsService],
  templateUrl: 'new.html',
})
export class NewExtensionsComponent {

  private errorMessage: string;

  private newExtensionForm: FormGroup;

  public newExtensionGroup = new FormControl('', Validators.required);

  public newExtensionName = new FormControl('', Validators.required);

  public newExtensionTree = new FormControl('master', Validators.required);

  public newExtensionVisibility = new FormControl('public', Validators.required);

  ownersListener: Subscription;

  owners: Subjects;

  constructor(private formBuilder: FormBuilder,
              private ownersService: SubjectsService,
              private newExtensionsService: NewExtensionsService) {

    this.newExtensionForm = formBuilder.group({
      'group': this.newExtensionGroup,
      'name': this.newExtensionName,
      'tree': this.newExtensionTree,
      'visibility': this.newExtensionVisibility,
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
    extensions.group = this.newExtensionGroup.value;
    extensions.name = this.newExtensionName.value;
    extensions.tree = this.newExtensionTree.value;
    extensions.visibility = this.newExtensionVisibility.value;

    this.newExtensionsService.commit(extensions).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }


}
