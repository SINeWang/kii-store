import {Component} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {User} from './shared/user/user.data';


@Component({
  selector: 'app-root',
  templateUrl: './app.root.html',
  styleUrls: ['./app.root.css'],
  providers: [
    UserService
  ]
})
export class AppComponent {

  user: User;

  constructor(private userService: UserService) {
    userService.visit().subscribe(
      user => this.user = user
    );
  }

}
