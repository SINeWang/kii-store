import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdChipsModule, MdInputModule, MdListModule, MdToolbarModule} from '@angular/material';


import {AppComponent} from './app.component';
import {ExtensionComponent} from './extension/extension.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExtensionComponent
  },
  {
    path: ':ownerId/:group',
    component: ExtensionComponent
  },

];

@NgModule({
  declarations: [
    AppComponent,
    ExtensionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [MdButtonModule, MdCardModule, MdListModule, MdToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
