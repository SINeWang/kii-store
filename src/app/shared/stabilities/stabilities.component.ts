import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stabilities',
  providers: [],
  templateUrl: 'stabilities.html'
})
export class StabilitiesComponent {

  @Output() onChanged = new EventEmitter<string>();

  choose(value: string) {
    this.onChanged.emit(value);
  }

}
