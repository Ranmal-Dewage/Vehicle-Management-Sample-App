
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { FileImportComponent } from './file-import/file-import.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { UpdateFormComponent } from './update-form/update-form.component';
import { GraphQLModule } from './graphql.module';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchItemsComponent } from './search-items/search-items.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 10000,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 5
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    VehicleDetailsComponent,
    FileImportComponent,
    UpdateFormComponent,
    PaginationComponent,
    SearchItemsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
