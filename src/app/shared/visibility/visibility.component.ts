import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-visibility',
  providers: [],
  templateUrl: 'visibility.html'
})
export class VisibilityComponent {

  @Output() onChanged = new EventEmitter<string>();

  choose(value: string) {
    this.onChanged.emit(value);
  }

}
