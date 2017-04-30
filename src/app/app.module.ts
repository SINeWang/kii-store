import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdListModule, MdToolbarModule} from '@angular/material';


import {AppComponent} from './app.component';
import {ExtensionComponent} from './extension/extension.component';

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
    MdListModule,
    MdToolbarModule],
  exports: [MdButtonModule, MdCardModule, MdListModule, MdToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
