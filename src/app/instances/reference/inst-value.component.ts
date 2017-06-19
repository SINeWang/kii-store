import {Component, Input} from '@angular/core';
import {Intension} from '../../prototypes/intension/intensions.data';
import {Glimpse} from '../../glimpses/glimpses.data';
@Component({
  selector: 'app-instances-value',
  providers: [],
  templateUrl: 'inst-value.html'
})
export class InstancesValueComponent {


  reference: boolean;

  intension: Intension;

  value: string;

  @Input()
  set the_intension(intension: Intension) {
    this.intension = intension;
  }

  @Input()
  set init_value(value: string) {
    this.value = value;
  }

  load_fields(glimpse: Glimpse) {
    console.log(glimpse);
  }


  save() {
    console.log('save');
    // const next = Object.assign({}, this.instances);
    // next.map = this.instances.current;
    // this.instancesService.commit(next, this.modelSub).subscribe(
    //   data => this.handle_status(data),
    //   error => this.errorMessage = <any>error
    // );
  }



}
