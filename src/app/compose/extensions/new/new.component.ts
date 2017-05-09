import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NewExtensionsService} from './new.service';
import {Extensions} from '../extensions.data';
import {Subscription} from 'rxjs/Subscription';
import {Owners} from '../../../owners/owners.data';
import {OwnersService} from '../../../owners/owners.service';

@Component({
  selector: 'app-compose-extensions-new',
  providers: [NewExtensionsService],
  templateUrl: 'new.html',
})
export class NewExtensionsComponent {

  private errorMessage: string;

  private newExtensionForm: FormGroup;

  public newExtensionName = new FormControl('', Validators.required);

  public newExtensionTree = new FormControl('master', Validators.required);

  public newExtensionVisibility = new FormControl('public', Validators.required);

  ownerSubscription: Subscription;

  owners: Owners;

  constructor(private formBuilder: FormBuilder,
              private ownersService: OwnersService,
              private newExtensionsService: NewExtensionsService) {

    this.newExtensionForm = formBuilder.group({
      'group': this.newExtensionName,
      'tree': this.newExtensionTree,
      'visibility': this.newExtensionVisibility,
    });

    this.ownerSubscription = ownersService.ownerAnnounced$.subscribe(
      owners => {
        this.owners = owners;
      }
    );
  }


  commit(): void {
    const authorization = localStorage.getItem('authorization');
    const extensions = new Extensions();
    extensions.name = this.newExtensionName.value;
    extensions.ownerId = this.owners.ownerId;

    this.newExtensionsService.commit(extensions).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }


}
