import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-structures',
  providers: [],
  templateUrl: 'structures.html'
})
export class StructuresComponent {

  @Output() onChanged = new EventEmitter<string>();

  choose(value: string) {
    this.onChanged.emit(value);
  }

}
