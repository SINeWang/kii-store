import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-single-multi',
  providers: [],
  templateUrl: 'singlemulti.html'
})
export class SingleMultiComponent {

  @Output() onChanged = new EventEmitter<boolean>();

  choose(value: boolean) {
    this.onChanged.emit(value);
  }

}
