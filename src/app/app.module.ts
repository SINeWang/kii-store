import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.root';
import {RouterModule, Routes} from '@angular/router';
import {MdlModule} from '@angular-mdl/core';
import {ModelsComponent} from './models/models.component';
import {ExtensionsComponent} from './extensions/extensions.component';
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
import {NewExtensionsComponent} from './extensions/new/new.component';
import {VisibilityComponent} from './shared/visibility/visibility.component';
import {AssetsComponent} from './assets/assets.component';
import {SubjectsComponent} from './shared/subjects/subjects.component';
import {StabilitiesComponent} from './shared/stabilities/stabilities.component';
import {StructuresComponent} from './shared/structures/structures.component';
import {SingleMultiComponent} from './shared/singlemulti/singlemulti.component';
import {IntensionsComponent} from './intensions/intensions.component';
import {AssetComponent} from './asset/asset.component';
import {WorkspaceComponent} from 'app/apps/workspace/workspace.component';
import {StatusesComponent} from './statuses/statuses.component';
import {StatusComponent} from './status/status.component';
import {InstancesEditorComponent} from './instances/editor/inst-editor.component';
import {InstancesSearchComponent} from './instances/search/inst-search.component';

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
        component: ExtensionsComponent
      },
      {
        path: 'prototypes/:owner-id',
        component: ExtensionsComponent
      },
      {
        path: 'prototypes/:owner-id/:group/:name',
        component: ExtensionsComponent
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
        path: 'statuses/:owner-id',
        component: StatusesComponent
      },
      {
        path: 'statuses',
        component: StatusesComponent
      },
      {
        path: 'assets/:owner-id/:group/:name',
        component: AssetsComponent
      },
      {
        path: 'assets/:owner-id',
        component: AssetsComponent
      },
      {
        path: 'assets',
        component: AssetsComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AssetComponent,
    AssetsComponent,
    ExtensionsComponent,
    InstancesComponent,
    InstancesEditorComponent,
    InstancesSearchComponent,
    IntensionsComponent,
    ModelsComponent,
    NewExtensionsComponent,
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
