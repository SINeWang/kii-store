import {Component} from '@angular/core';
import {PublicationService} from '../publication/publication.service';
import {SubjectsService} from '../shared/subjects/subjects.service';
import {ModelsService} from '../models/models.service';
import {IntensionsService} from '../intensions/intensions.service';
import {ExtensionsService} from '../extensions/extensions.service';
@Component({
  selector: 'app-prototypes',
  providers: [ExtensionsService, IntensionsService, ModelsService, SubjectsService, PublicationService],
  templateUrl: 'prototypes.html',
})
export class PrototypesComponent {

}
