import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.root';
import {RouterModule, Routes} from '@angular/router';
import {MdlModule} from '@angular-mdl/core';
import {ModelsComponent} from './models/models.component';
import {ExtensionsComponent} from './prototypes/extension/extensions.component';
import {
  MdAutocompleteModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import {InstancesComponent} from './instances/instances.component';
import {VisibilityComponent} from './shared/visibility/visibility.component';
import {GlimpsesComponent} from './glimpses/glimpses.component';
import {SubjectsComponent} from './shared/subjects/subjects.component';
import {StabilitiesComponent} from './shared/stabilities/stabilities.component';
import {StructuresComponent} from './shared/structures/structures.component';
import {SingleMultiComponent} from './shared/singlemulti/singlemulti.component';
import {IntensionsComponent} from './prototypes/intension/intensions.component';
import {WorkspaceComponent} from 'app/apps/workspace/workspace.component';
import {StatusesComponent} from './statuses/statuses.component';
import {InstancesEditorComponent} from './instances/editor/inst-editor.component';
import {InstancesSearchComponent} from './instances/search/inst-search.component';
import {NewExtensionsComponent} from './prototypes/extension/new/proto-ext-new.component';
import {StatusComponent} from './statuses/status.component';
import {PrototypesComponent} from './prototypes/prototypes.component';
import {GlimpsesSearchComponent} from './glimpses/search/glimpses-search.component';
import {GlimpsesViewerComponent} from './glimpses/viewer/glimpses-viewer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'workspace'
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    children: [
      {
        path: 'prototypes',
        component: PrototypesComponent
      },
      {
        path: 'prototypes/:owner-id',
        component: PrototypesComponent
      },
      {
        path: 'prototypes/:owner-id/:group/:name',
        component: PrototypesComponent
      },
      {
        path: 'models',
        component: ModelsComponent
      },
      {
        path: 'models/:provider-id',
        component: ModelsComponent
      },
      {
        path: 'models/:provider-id/:group/:name',
        component: ModelsComponent
      },
      {
        path: 'instances',
        component: InstancesComponent
      },
      {
        path: 'instances/:owner-id',
        component: InstancesComponent
      },
      {
        path: 'instances/:owner-id/:group/:name',
        component: InstancesComponent
      },
      {
        path: 'statuses/:owner-id/:group/:name',
        component: StatusesComponent
      },
      {
        path: 'statuses/:owner-id/:set',
        component: StatusesComponent
      },
      {
        path: 'statuses/:owner-id',
        component: StatusesComponent
      },
      {
        path: 'statuses',
        component: StatusesComponent
      },
      {
        path: 'glimpses',
        component: GlimpsesComponent
      },
      {
        path: 'glimpses/:owner-id',
        component: GlimpsesComponent
      },
      {
        path: 'glimpses/:owner-id/:id',
        component: GlimpsesComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ExtensionsComponent,
    GlimpsesComponent,
    GlimpsesSearchComponent,
    GlimpsesViewerComponent,
    InstancesComponent,
    InstancesEditorComponent,
    InstancesSearchComponent,
    IntensionsComponent,
    ModelsComponent,
    NewExtensionsComponent,
    PrototypesComponent,
    SingleMultiComponent,
    StabilitiesComponent,
    StatusComponent,
    StatusesComponent,
    StructuresComponent,
    SubjectsComponent,
    VisibilityComponent,
    WorkspaceComponent
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
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdToolbarModule,
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
