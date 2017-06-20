import {Component, Input} from '@angular/core';
import {Intension} from '../../prototypes/intension/intensions.data';
import {GlimpseIntensions, Glimpses} from '../../glimpses/glimpses.data';
import {ModelSub} from '../../models/subscription/model-sub.data';
import {InstancesService} from '../instances.service';
import {GlimpsesService} from '../../glimpses/glimpses.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-instances-value',
  providers: [GlimpsesService],
  templateUrl: 'inst-value.html'
})
export class InstancesValueComponent {

  errorMessage: string;

  reference: boolean;

  intension: Intension;

  value: string;

  modelSub: ModelSub;

  candidateIntensions: GlimpseIntensions[];

  selected_intension = new FormControl();


  constructor(private instancesService: InstancesService,
              private glimpseService: GlimpsesService) {
  }

  @Input()
  set the_intension(intension: Intension) {
    this.intension = intension;
  }

  @Input()
  set init_value(value: string) {
    this.value = value;
  }

  @Input()
  set the_model_sub(modelSub: ModelSub) {
    this.modelSub = modelSub;
  }

  load_intensions(glimpses: Glimpses) {
    this.glimpseService.load_intensions(glimpses).subscribe(
      data => {
        this.candidateIntensions = data;
        console.log(data);
      },
      error => this.errorMessage = <any>error
    );
  }

  displayCandidates(intensions: GlimpseIntensions): string {
    return intensions ? intensions.field : '';
  }


  save() {
    // console.log('save');
    // const next = Object.assign({}, this.instances);
    // next.map = this.instances.current;
    // this.instancesService.commit(next, this.modelSub).subscribe(
    //   data => this.handle_status(data),
    //   error => this.errorMessage = <any>error
    // );
  }


}
