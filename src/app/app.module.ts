import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.root';
import {ExploreComponent} from './apps/explore/explore.component';
import {RouterModule, Routes} from '@angular/router';
import {MdlModule} from '@angular-mdl/core';
import {ModelsComponent} from './models/models.component';
import {ComposeComponent} from './apps/compose/compose.component';
import {ExtensionsComponent} from './extensions/extensions.component';
import {
  MdAutocompleteModule, MdCheckboxModule, MdIconModule, MdInputModule, MdRadioModule,
  MdSlideToggleModule
} from '@angular/material';
import {InstancesComponent} from './instances/instances.component';
import {NewExtensionsComponent} from './extensions/new/new.component';
import {VisibilityComponent} from './shared/visibility/visibility.component';
import {AssetsComponent} from './assets/assets.component';
import {SubscriptionsSearchComponent} from './subscriptions/search/search.component';
import {InstancesEditorComponent} from './instances/editor/editor.component';
import {SubjectsComponent} from './shared/subjects/subjects.component';
import {GroupNameTreeComponent} from './gnt/gnt.component';
import {StabilitiesComponent} from './shared/stabilities/stabilities.component';
import {StructuresComponent} from './shared/structures/structures.component';
import {SingleMultiComponent} from './shared/singlemulti/singlemulti.component';
import {IntensionsComponent} from './intensions/intensions.component';
import {DashboardComponent} from './apps/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'explore',
    pathMatch: 'full',
    component: ExploreComponent
  },
  {
    path: 'compose',
    pathMatch: 'full',
    component: ComposeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    ComposeComponent,
    DashboardComponent,
    ExploreComponent,
    ExtensionsComponent,
    GroupNameTreeComponent,
    InstancesComponent,
    InstancesEditorComponent,
    IntensionsComponent,
    ModelsComponent,
    NewExtensionsComponent,
    SingleMultiComponent,
    StabilitiesComponent,
    StructuresComponent,
    SubjectsComponent,
    SubscriptionsSearchComponent,
    VisibilityComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdlModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
