import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-workspace',
  providers: [],
  templateUrl: 'workspace.html'
})
export class WorkspaceComponent {

  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(private route: ActivatedRoute) {
    this.routeLinks = [
      {label: 'Prototype', link: 'prototypes'},
      {label: 'Model', link: 'models'},
      {label: 'Instance', link: 'instances'},
      {label: 'Status', link: 'statuses'},
      {label: 'Glimpse', link: 'glimpses'}];
    if (route.snapshot.children.length > 0) {
      const path = route.snapshot.children[0].url[0].path;
      for (let _i = 0; _i < this.routeLinks.length; _i++) {
        if (path === this.routeLinks[_i].link) {
          this.activeLinkIndex = _i;
        }
      }
    }
  }
}
