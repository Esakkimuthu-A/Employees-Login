import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatTableModule} from '@angular/material/table';
import { LoaderComponent } from './components/loader/loader.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule
  ],
  exports:[
    LoaderComponent
  ]
  
})
export class SharedModule { }
