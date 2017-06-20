import {Component, Input} from '@angular/core';
import {Intension} from '../../prototypes/intension/intensions.data';
import {GlimpseIntensions, Glimpses} from '../../glimpses/glimpses.data';
import {ModelSub} from '../../models/subscription/model-sub.data';
import {InstancesService} from '../instances.service';
import {GlimpsesService} from '../../glimpses/glimpses.service';
import {FormControl} from '@angular/forms';
import {Values} from './inst-value.data';
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

  reference_glimpse: Glimpses;

  reference_intension: GlimpseIntensions;

  constructor(private instancesService: InstancesService,
              private glimpseService: GlimpsesService) {

    this.selected_intension.valueChanges
      .startWith(null)
      .subscribe(name => this.onReferenceIntensionsChange(name));
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


  onReferenceIntensionsChange(query: any) {
    if (query instanceof Object) {
      this.reference_intension = query;
      return;
    }
  }

  load_intensions(glimpses: Glimpses) {
    this.reference_glimpse = glimpses;
    this.glimpseService.load_intensions(glimpses).subscribe(
      data => {
        this.candidateIntensions = data;
      },
      error => this.errorMessage = <any>error
    );
  }

  displayCandidates(intensions: GlimpseIntensions): string {
    return intensions ? intensions.field : '';
  }


  save() {
    const values = new Values();
    values.reference = this.reference;
    if (this.reference) {
      values.values = [this.reference_intension.field];
    } else {
      values.values = [this.value];
    }
    values.valueRefId = this.reference_glimpse.set;
    this.instancesService.commit(values, this.modelSub, this.reference_intension).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error
    );
  }


}
