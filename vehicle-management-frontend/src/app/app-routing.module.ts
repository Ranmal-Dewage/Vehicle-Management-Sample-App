import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { FileExportComponent } from './file-export/file-export.component';

const routes: Routes = [

  //file upload path (home)
  {
    path: '',
    component: FileUploadComponent
  },
  //vehicle details path
  {
    path: 'details',
    component: VehicleDetailsComponent
  },
  //file download path
  {
    path: 'export',
    component: FileExportComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
