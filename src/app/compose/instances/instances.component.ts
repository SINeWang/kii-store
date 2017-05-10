import {Component} from '@angular/core';
import {OwnersService} from '../../owners/owners.service';

@Component({
  selector: 'app-compose-instances',
  providers: [OwnersService],
  templateUrl: 'instances.html'
})
export class InstancesComponent {

}
