import {Component} from '@angular/core';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {ModelsService} from '../models/models.service';
import {IntensionsService} from '../intensions/intensions.service';
import {ExtensionsService} from '../extensions/extensions.service';
import {ProtoPubSetvice} from './publication/proto-pub.service';
@Component({
  selector: 'app-prototypes',
  providers: [ExtensionsService, IntensionsService, ModelsService, SubjectsService, ProtoPubSetvice],
  templateUrl: 'prototypes.html',
})
export class PrototypesComponent {

}
