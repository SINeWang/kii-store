import {Component, OnInit} from '@angular/core';
import {ExtensionService} from './extension.service';
import {Extension} from './extension.data';
// import {ActivatedRoute, Params} from '@angular/router';

@Component({
  providers: [ExtensionService],
  selector: 'app-extension',
  templateUrl: 'extension.html'
})
export class ExtensionComponent implements OnInit {

  errorMessage: string;

  extension: Extension;

  constructor(
    // private activatedRoute: ActivatedRoute,
              private extensionService: ExtensionService) {
  }

  ngOnInit(): void {
    const authorization = localStorage.getItem('authorization');
    // this.activatedRoute.queryParams.subscribe(
    //   (params: Params) => {
    //   }
    // );

    this.extensionService.get(authorization).subscribe(
      data => this.handleData(data),
      error => this.errorMessage = <any>error
    );
  }

  handleData(extension: Extension) {
    this.extension = extension;
  }
}
