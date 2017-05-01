import {Component, OnInit} from '@angular/core';
import {EntitiesService} from './entities.service';
import {ActivatedRoute} from '@angular/router';
import {Entities} from 'app/explore/entities/entities.data';


@Component({
  selector: 'app-explore-entities',
  providers: [EntitiesService],
  templateUrl: 'entities.html'
})
export class EntitiesComponent implements OnInit {


  errorMessage: string;

  searchForm = new Entities();

  entities: Entities;

  constructor(private activatedRoute: ActivatedRoute,
              private entitiesService: EntitiesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.searchForm.ownerId = params['ownerId'];
        this.searchForm.group = params['group'];
        this.search();
      }
    );
  }

  search(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.searchForm.ownerId !== ''
      && this.searchForm.group !== ''
      && this.searchForm.ownerId != null
      && this.searchForm.group != null) {
      this.entitiesService.get(authorization, this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(entities: Entities) {
    this.entities = entities;
  }
}
