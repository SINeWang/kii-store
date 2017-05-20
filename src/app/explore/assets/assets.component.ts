import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssetsService} from './assets.service';
import {Assets, Intension} from './assets.data';
import {SubjectsService} from '../../subjects/subjects.service';


@Component({
  selector: 'app-explore-assets',
  providers: [AssetsService, SubjectsService],
  templateUrl: 'assets.html'
})
export class AssetsComponent implements OnInit {


  errorMessage: string;

  searchForm = new Assets();

  instances: Object;

  intensions: Intension[];

  instancesKeys: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private assetsService: AssetsService) {
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
    if (this.searchForm.group !== ''
      && this.searchForm.group != null) {
      this.assetsService.visit(this.searchForm).subscribe(
        data => this.handleData(data),
        error => this.errorMessage = <any>error
      );
    }
  }

  handleData(assets: Assets) {
    this.instances = assets.instances;
    this.intensions = assets.intensions;
    this.instancesKeys = Object.keys(this.instances);
    this.searchForm.group = assets.group;
    this.searchForm.ownerId = assets.ownerId;
    this.searchForm.name = assets.name;
    this.searchForm.tree = assets.tree;
  }


}
