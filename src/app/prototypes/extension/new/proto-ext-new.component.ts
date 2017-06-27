import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Extensions} from '../extensions.data';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../../../shared/subjects/subjects.data';
import {NewExtensionsService} from './proto-ext-new.service';
import {UserService} from '../../../shared/user/user.service';

@Component({
  selector: 'app-proto-ext-new',
  providers: [NewExtensionsService],
  templateUrl: 'proto-ext-new.html',
})
export class NewExtensionsComponent implements OnDestroy, OnInit {


  private errorMessage: string;

  private newExtensionForm: FormGroup;

  private newExtensionName = new FormControl('', Validators.required);

  private _group: string;

  _visibility: string;

  userListener: Subscription;

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
              private userService: UserService,
              private newExtensionsService: NewExtensionsService) {

    this.newExtensionForm = formBuilder.group({
      'name': this.newExtensionName,
    });


  }

  ngOnDestroy(): void {
    this.userListener.unsubscribe();
  }

  ngOnInit(): void {
    this.userListener = this.userService.user$.subscribe(
      data => {
        this.owners = new Subjects();
        this.owners.id = data.username;
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
