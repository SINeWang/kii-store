import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  providers: [],
  templateUrl: 'dashboard.html'
})
export class DashboardComponent {

  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(private route: ActivatedRoute) {
    this.routeLinks = [
      {label: 'Extensions', link: 'extensions'},
      {label: 'Models', link: 'models'},
      {label: 'Instances', link: 'instances'},
      {label: 'Assets', link: 'assets'}];
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
