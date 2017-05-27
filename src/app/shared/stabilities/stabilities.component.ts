import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-stabilities',
  providers: [],
  templateUrl: 'stabilities.html'
})
export class StabilitiesComponent {

  @Output() onChanged = new EventEmitter<string>();

  latestEnabled = true;

  @Input()
  set latest_enabled(value: string) {
    if ('false' === value) {
      this.latestEnabled = false;
    }

  }

  choose(value: string) {
    this.onChanged.emit(value);
  }

}
