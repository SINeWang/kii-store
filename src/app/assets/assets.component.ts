import {Component} from '@angular/core';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {Subscription} from 'rxjs/Subscription';
import {Subjects} from '../shared/subjects/subjects.data';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-assets',
  providers: [SubjectsService],
  templateUrl: 'assets.html'
})
export class AssetsComponent {

  errorMessage: string;

  ownersListener: Subscription;

  owners: Subjects;


  constructor(private ownersService: SubjectsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.ownersListener = ownersService.announced$.subscribe(
      owners => this.handleOwners(owners)
    );
  }

  handleOwners(owners: Subjects) {
    if (owners == null) {
      return;
    }
    this.owners = owners;
    const parentPath = this.route.parent.snapshot.url[0].path;
    const currentPath = this.route.snapshot.url[0].path;
    this.router.navigate([parentPath, currentPath, owners.id]);
  }


}
