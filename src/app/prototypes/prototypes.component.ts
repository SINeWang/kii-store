import {Component} from '@angular/core';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {ModelsService} from '../models/models.service';
import {ProtoPubSetvice} from './publication/proto-pub.service';
import {ExtensionsService} from './extension/extensions.service';
import {IntensionsService} from './intension/intensions.service';
@Component({
  selector: 'app-prototypes',
  providers: [ExtensionsService, IntensionsService, ModelsService, SubjectsService, ProtoPubSetvice],
  templateUrl: 'prototypes.html',
})
export class PrototypesComponent {

}
