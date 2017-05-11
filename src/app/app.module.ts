import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.root';
import {ExploreComponent} from './explore/explore.component';
import {RouterModule, Routes} from '@angular/router';
import {MdlModule} from '@angular-mdl/core';
import {ModelsComponent} from './explore/models/models.component';
import {ComposeComponent} from './compose/compose.component';
import {ExtensionsComponent} from './compose/extensions/extensions.component';
import {MdAutocompleteModule, MdIconModule, MdInputModule, MdRadioModule, MdSlideToggleModule} from '@angular/material';
import {InstancesComponent} from './compose/instances/instances.component';
import {OwnersComponent} from './owners/owners.component';
import {NewExtensionsComponent} from './compose/extensions/new/new.component';
import {VisibilityComponent} from './compose/visibility/visibility.component';
import {AssetsComponent} from './explore/assets/assets.component';
import {SubscriptionsSearchComponent} from './subscriptions/search/search.component';
import {InstancesEditorComponent} from './compose/instances/editor/editor.component';
import {SubscribersComponent} from './subscribers/subscribers.component';

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
];

@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    ComposeComponent,
    ExploreComponent,
    ExtensionsComponent,
    InstancesComponent,
    InstancesEditorComponent,
    ModelsComponent,
    NewExtensionsComponent,
    OwnersComponent,
    SubscribersComponent,
    SubscriptionsSearchComponent,
    VisibilityComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdAutocompleteModule,
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
