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
import {EntitiesComponent} from './explore/entities/entities.component';
import {DevelopComponent} from './develop/develop.component';
import {ExtensionsComponent} from './develop/extensions/extensions.component';
import {MdAutocompleteModule, MdInputModule} from '@angular/material';

const routes: Routes = [
  {
    path: 'explore',
    pathMatch: 'full',
    component: ExploreComponent
  },
  {
    path: 'develop',
    pathMatch: 'full',
    component: DevelopComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DevelopComponent,
    EntitiesComponent,
    ExploreComponent,
    ExtensionsComponent,
    ModelsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdAutocompleteModule,
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
