import {Component, OnInit} from '@angular/core';
import {ModelsService} from './models.service';
import {ActivatedRoute} from '@angular/router';
import {Extension} from './models.data';
@Component({
  selector: 'app-explore-models',
  providers: [ModelsService],
  templateUrl: 'models.html'
})
export class ModelsComponent implements OnInit {

  errorMessage: string;

  extension: Extension;

  ownerId: string;

  group: string;

  constructor(private activatedRoute: ActivatedRoute,
              private modelsService: ModelsService) {
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
      this.modelsService.get(authorization, this.ownerId, this.group).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(extension: Extension) {
    this.extension = extension;
  }
}
