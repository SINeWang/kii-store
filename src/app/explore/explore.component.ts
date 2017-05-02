import {Component, OnInit} from '@angular/core';
import {ModelsService} from './models/models.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-explore',
  providers: [ModelsService],
  templateUrl: 'explore.html'
})
export class ExploreComponent implements OnInit {

  activeIndex: number;

  target: string;

  group: string;

  ownerId: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.target = params['target'];
        this.switchTab();
      }
    );
  }

  switchTab(): void {
    switch (this.target) {
      case 'models':
        this.activeIndex = 0;
        break;
      case 'instances':
        this.activeIndex = 1;
        break;
      default:
        this.activeIndex = 0;
    }
  }

  public tabChanged({index}) {
    switch (this.target) {
      case 'models':
        if (index === 1) {
          window.location.href = '/explore/instances/';
        }
        break;
      case 'instances':
        if (index === 0) {
          window.location.href = '/explore/models';
        }
        break;
      default:
        this.activeIndex = 0;
    }
  }
}
