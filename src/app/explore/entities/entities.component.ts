import {Component, OnInit} from '@angular/core';
import {EntitiesService} from './entities.service';
import {ActivatedRoute} from '@angular/router';
import {Entities, Intension} from 'app/explore/entities/entities.data';


@Component({
  selector: 'app-explore-entities',
  providers: [EntitiesService],
  templateUrl: 'entities.html'
})
export class EntitiesComponent implements OnInit {


  errorMessage: string;

  searchForm = new Entities();

  instances: Object;

  intensions: Intension[];

  instancesKeys: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private entitiesService: EntitiesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.searchForm.ownerId = params['ownerId'];
        this.searchForm.group = params['group'];
        this.search();
      }
    );
  }

  search(): void {
    const authorization = localStorage.getItem('authorization');
    if (this.searchForm.group !== ''
      && this.searchForm.group != null) {
      this.entitiesService.get(authorization, this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(entities: Entities) {
    this.instances = entities.instances;
    this.intensions = entities.intensions;
    this.instancesKeys = Object.keys(this.instances);
    this.searchForm.group = entities.group;
    this.searchForm.ownerId = entities.ownerId;
    this.searchForm.name = entities.name;
    this.searchForm.tree = entities.tree;
  }


}
