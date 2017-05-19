import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-publications',
  providers: [],
  templateUrl: 'publications.html'
})
export class PublicationsComponent {

  @Output() onChanged = new EventEmitter<string>();

  choose(value: string) {
    this.onChanged.emit(value);
  }

}
