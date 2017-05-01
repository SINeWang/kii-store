import {Component, OnInit} from '@angular/core';
import {EntitiesService} from './entities.service';
import {ActivatedRoute} from '@angular/router';
import {Extension} from '../models/models.data';


@Component({
  selector: 'app-explore-entities',
  providers: [EntitiesService],
  templateUrl: 'entities.html'
})
export class EntitiesComponent implements OnInit {


  errorMessage: string;

  extension: Extension;

  ownerId: string;

  group: string;

  constructor(private activatedRoute: ActivatedRoute,
              private entitiiesService: EntitiesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.ownerId = params['ownerId'];
        this.group = params['group'];
        this.fetchData();
      }
    );
  }

  fetchData(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.ownerId !== '' && this.group !== '' && this.ownerId != null && this.group != null) {
      this.entitiiesService.get(authorization, this.ownerId, this.group).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(extension: Extension) {
    this.extension = extension;
  }
}
