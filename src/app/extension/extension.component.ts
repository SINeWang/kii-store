import {Component, OnInit} from '@angular/core';
import {ExtensionService} from './extension.service';
import {Extension} from './extension.data';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-extension',
  providers: [ExtensionService],
  templateUrl: 'extension.html'
})
export class ExtensionComponent implements OnInit {

  errorMessage: string;

  extension: Extension;

  ownerId: string;

  group: string;

  constructor(private activatedRoute: ActivatedRoute,
              private extensionService: ExtensionService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.ownerId = params['ownerId'];
        this.group = params['group'];
        this.fetchData();
      }
    );
  }

  submit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.ownerId !== '' && this.group !== '' && this.ownerId != null && this.group != null) {
      this.extensionService.get(authorization, this.ownerId, this.group).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(extension: Extension) {
    this.extension = extension;
  }
}
