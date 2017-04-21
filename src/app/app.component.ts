import {Component} from "@angular/core";
import {MdCardModule, MdToolbarModule} from "@angular/material";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private mdCard: MdCardModule,
              private mdToolBar: MdToolbarModule) {
  }
}
