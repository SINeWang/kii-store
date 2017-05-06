import {Component} from '@angular/core';
import {Extension} from './extensions.data';
import {ExtensionsService} from './extensions.service';

@Component({
  selector: 'app-develop-extensions',
  providers: [ExtensionsService],
  templateUrl: 'extensions.html'
})
export class ExtensionsComponent {

  private form = new Extension();

  private errorMessage: string;

  constructor(private extensionService: ExtensionsService) {
    this.form.tree = 'master';
    this.form.visibility = 'public';
  }

  commit(): void {
    const authorization = localStorage.getItem('authorization');
    this.extensionService.commit(authorization, this.form).subscribe(
      data => this.handle_receipt(data),
      error => this.errorMessage = <any>error
    );
  }

  handle_receipt(receipt: any) {

  }
}
