import {Component} from '@angular/core';
@Component({
  selector: 'app-dashboard',
  providers: [],
  templateUrl: 'dashboard.html'
})
export class DashboardComponent {

  routeLinks: any[];
  activeLinkIndex = 0;

  constructor() {
    this.routeLinks = [
      {label: 'Extensions', link: 'extensions'},
      {label: 'Models', link: 'models'},
      {label: 'Instances', link: 'instances'},
      {label: 'Assets', link: 'assets'}];
  }
}
